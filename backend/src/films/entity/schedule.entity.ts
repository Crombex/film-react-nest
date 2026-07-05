import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  daytime: string;

  @Column('integer', { nullable: false })
  hall: number;

  @Column('integer', { nullable: false })
  rows: number;

  @Column('integer', { nullable: false })
  seats: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('varchar', { nullable: false })
  taken: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: FilmEntity;
}
