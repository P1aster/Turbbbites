import { SpecialHour } from '@/models/special-hours/entities/special-hours.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialHoursController } from './special-hours.controller';
import { SpecialHoursService } from './special-hours.service';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [RestaurantModule, TypeOrmModule.forFeature([SpecialHour])],
  controllers: [SpecialHoursController],
  providers: [SpecialHoursService],
  exports: [SpecialHoursService],
})
export class SpecialHoursModule {}
