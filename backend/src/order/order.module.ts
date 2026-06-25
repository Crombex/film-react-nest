import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { FilmsModule } from '../films/films.module';

@Module({
  imports: [FilmsModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
