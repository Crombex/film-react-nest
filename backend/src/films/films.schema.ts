import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FilmScheduleEntity } from './entity/film-schedule.entity';

@Schema()
export class Film {
  @Prop()
  _id: string;

  @Prop({ unique: true })
  id: string;

  @Prop({ required: true, minValue: 0, maxValue: 10 })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop()
  tags: string[];

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  about: string;

  @Prop()
  description: string;

  @Prop()
  schedule: FilmScheduleEntity[];
}

export type FilmDocument = HydratedDocument<Film>;
export const FilmSchema = SchemaFactory.createForClass(Film);
