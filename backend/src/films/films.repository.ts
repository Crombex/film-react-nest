import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmModel } from './model/film.model';
import { FilmEntity } from './entity/film.entity';
import { Repository, DataSource } from 'typeorm';
import { ScheduleNotFound } from './exceptions/schedule-not-found.exception';
import { UpdateTakenPlacesException } from './exceptions/update-taken-places.exception';
import { ScheduleEntity } from './entity/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity) private filmModel: Repository<FilmEntity>,
    @InjectRepository(ScheduleEntity)
    private scheduleModel: Repository<ScheduleEntity>,
    private dataSource: DataSource,
  ) {}

  async findAll() {
    const films = await this.filmModel.find();
    return films;
  }

  async findFilmScheduleByID(id: FilmModel['id']) {
    const film = await this.filmModel.findOne({
      where: { id },
      relations: ['schedule'],
    });
    return film?.schedule || [];
  }

  async updateFilmTakenPlaces(
    id: FilmEntity['id'],
    session: string,
    place: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const schedule = await queryRunner.manager
        .getRepository(ScheduleEntity)
        .createQueryBuilder('schedule')
        .innerJoinAndSelect('schedule.film', 'film')
        .setLock('pessimistic_write')
        .where('schedule.id = :session', { session })
        .andWhere('film.id = :id', { id })
        .getOne();

      if (!schedule) {
        throw new ScheduleNotFound('Schedule not found');
      }

      const taken = schedule.taken ? schedule.taken.split(',') : [];

      if (taken.includes(place)) {
        throw new UpdateTakenPlacesException('Place already taken');
      }

      taken.push(place);
      schedule.taken = taken.join(',');

      await queryRunner.manager.save(schedule);
      await queryRunner.commitTransaction();

      return await queryRunner.manager.getRepository(FilmEntity).findOne({
        where: { id },
        relations: ['schedule'],
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
