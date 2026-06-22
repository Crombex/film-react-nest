import { Controller, Get, Param } from '@nestjs/common';
import { GetFilmScheduleDTO } from './dto/get-film-schedule.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  findAllfilms() {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  findFilmScheduleByID(@Param() id: GetFilmScheduleDTO) {
    return this.filmsService.findFilmScheduleByID(id.id);
  }
}
