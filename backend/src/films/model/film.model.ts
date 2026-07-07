import { FilmScheduleModel } from './film-schedule.model';

export interface FilmModel {
  _id: string;
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: FilmScheduleModel[];
}
