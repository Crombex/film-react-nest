import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: CreateOrderDTO) {
    const result = await this.orderService.createOrder(order);
    return {
      total: result.length,
      items: result,
    };
  }
}
