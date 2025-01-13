import { BusinessHour } from '@/models/business-hours/entities/business-hour.entity';
import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessHoursController } from './business-hours.controller';
import { BusinessHoursService } from './business-hours.service';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [
    RestaurantModule,
    TypeOrmModule.forFeature([BusinessHour, Restaurant]),
  ],
  controllers: [BusinessHoursController],
  providers: [BusinessHoursService],
  exports: [BusinessHoursService],
})
export class BusinessHoursModule {}
