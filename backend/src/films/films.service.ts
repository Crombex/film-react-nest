import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './films.repository';
import { FilmModel } from './model/film.model';

import { FilmNotFound } from './exceptions/film-not-found.exception';

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

  async findFilmScheduleByID(id: FilmModel['id']) {
    const schedule = await this.filmsRepository.findFilmScheduleByID(id);
    if (schedule.length === 0) {
      throw new FilmNotFound('Film not found');
    }
    return schedule;
  }

  async updateFilmTakenPlaces(
    id: FilmModel['id'],
    session: string,
    place: string,
  ) {
    const updatedFilm = await this.filmsRepository.updateFilmTakenPlaces(
      id,
      session,
      place,
    );
    return updatedFilm!.schedule.find((item) => item.id === session);
  }
}
