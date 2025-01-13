import { RestaurantStock } from '@/models/restaurant-stock/entities/restaurant-stock.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantStockController } from './restaurant-stock.controller';
import { RestaurantStockService } from './restaurant-stock.service';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    RestaurantModule,
    ProductModule,
    OrderModule,
    TypeOrmModule.forFeature([RestaurantStock]),
  ],
  controllers: [RestaurantStockController],
  providers: [RestaurantStockService],
})
export class RestaurantStockModule {}
