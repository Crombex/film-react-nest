import { FilmScheduleEntity } from './film-schedule.entity';

export interface FilmEntity {
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
  schedule: FilmScheduleEntity[];
}
