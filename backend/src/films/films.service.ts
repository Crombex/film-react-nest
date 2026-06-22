import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import { FilmEntity } from './entity/film.entity';
import { UpdateTakenPlacesException } from './exceptions/update-taken-places.exception';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsRepository) {}

  async findAll() {
    const films = await this.filmsRepository.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  async findFilmScheduleByID(id: FilmEntity['id']) {
    const schedule = await this.filmsRepository.findFilmScheduleByID(id);
    return {
      total: schedule.length,
      items: schedule,
    };
  }

  async updateFilmTakenPlaces(
    id: FilmEntity['id'],
    session: string,
    place: string,
  ) {
    const updatedFilm = await this.filmsRepository.updateFilmTakenPlaces(
      id,
      session,
      place,
    );
    if (!updatedFilm) {
      throw new UpdateTakenPlacesException('Failed to update taken places');
    }
    return updatedFilm.schedule.find((item) => item.id === session);
  }
}
