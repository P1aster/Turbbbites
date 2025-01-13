import { OrderItem } from '@/models/order-items/entities/order-item.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';
import { DishModule } from '../dish/dish.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [DishModule, OrderModule, TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
