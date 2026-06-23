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
  async findFilmScheduleByID(@Param() id: GetFilmScheduleDTO) {
    const schedule = await this.filmsService.findFilmScheduleByID(id.id);
    return {
      total: schedule.length,
      items: schedule,
    };
  }
}
