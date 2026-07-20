import { Test } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { FilmsService } from './films.service';

describe('OrderController', () => {
  let filmsController: FilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(),
        findFilmScheduleByID: jest.fn(),
      })
      .compile();

    filmsController = moduleRef.get<FilmsController>(FilmsController);
    filmsService = moduleRef.get<FilmsService>(FilmsService);
  });

  it('.findAllFilms() should call findAll of the service', () => {
    filmsController.findAllfilms();
    expect(filmsService.findAll).toHaveBeenCalled();
  });

  it('.findFilmScheduleByID() should call findFilmScheduleByID of the service', async () => {
    jest.spyOn(filmsService, 'findFilmScheduleByID').mockResolvedValue([]);
    await filmsController.findFilmScheduleByID({
      id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    });
    expect(filmsService.findFilmScheduleByID).toHaveBeenCalledWith(
      'd290f1ee-6c54-4b01-90e6-d701748f0851',
    );
  });
});
