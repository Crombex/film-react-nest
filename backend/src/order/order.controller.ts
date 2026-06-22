import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Body() order: CreateOrderDTO) {
    return this.orderService.createOrder(order);
  }
}
