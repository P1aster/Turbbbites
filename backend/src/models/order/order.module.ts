import { Order } from '@/models/order/entities/order.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [RestaurantModule, UserModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
