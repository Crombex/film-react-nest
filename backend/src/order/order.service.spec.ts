import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { FilmsService } from '../films/films.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(),
        updateFilmTakenPlaces: jest.fn(),
        findFilmScheduleByID: jest.fn(),
      })
      .compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
