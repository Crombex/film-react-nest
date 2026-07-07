import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsRepository } from './films.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEntity } from './entity/film.entity';
import { ScheduleEntity } from './entity/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FilmEntity, ScheduleEntity])],
  providers: [FilmsService, FilmsRepository],
  controllers: [FilmsController],
  exports: [FilmsService],
})
export class FilmsModule {}
