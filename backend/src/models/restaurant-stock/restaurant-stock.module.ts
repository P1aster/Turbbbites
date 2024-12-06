import { RestaurantStock } from '@/models/restaurant-stock/entities/restaurant-stock.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantStockController } from './restaurant-stock.controller';
import { RestaurantStockService } from './restaurant-stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantStock])],
  controllers: [RestaurantStockController],
  providers: [RestaurantStockService],
})
export class RestaurantStockModule {}
