import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { FilmsRepository } from './films.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService, FilmsRepository],
    })
      .overrideProvider(FilmsRepository)
      .useValue({
        findAll: jest.fn(),
        updateFilmTakenPlaces: jest.fn(),
        findFilmScheduleByID: jest.fn(),
      })
      .compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
