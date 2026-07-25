import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn(),
      })
      .compile();

    orderController = moduleRef.get<OrderController>(OrderController);
    orderService = moduleRef.get<OrderService>(OrderService);
  });

  it('.createOrder() should call createOrder of the service', () => {
    const fakeOrder = {
      email: '213',
      phone: '1232',
      tickets: [],
    };

    jest.spyOn(orderService, 'createOrder').mockResolvedValue([]);
    orderController.createOrder(fakeOrder);
    expect(orderService.createOrder).toHaveBeenCalledWith(fakeOrder);
  });
});
