import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './films.schema';
import { FilmEntity } from './entity/film.entity';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  findAll() {
    return this.filmModel.find().exec();
  }

  async findFilmScheduleByID(id: FilmEntity['id']) {
    const film = await this.filmModel.findOne({ id }).exec();
    return film.schedule;
  }

  updateFilmTakenPlaces(id: FilmEntity['id'], session: string, place: string) {
    return this.filmModel
      .findOneAndUpdate(
        { id, 'schedule.id': session },
        { $push: { 'schedule.$.taken': place } },
        { new: true },
      )
      .exec();
  }
}
