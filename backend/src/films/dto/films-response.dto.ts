import {
  IsString,
  IsUUID,
  IsNumber,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { FilmScheduleEntity } from '../entity/film-schedule.entity';

export class FilmsResponseDTO {
  @IsString()
  _id: string;

  @IsUUID(4)
  id: string;

  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsArray()
  tags: string[];

  @IsString()
  image: string;

  @IsString()
  cover: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsArray()
  schedule: FilmScheduleEntity[];
}
