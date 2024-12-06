import { BusinessHour } from '@/models/business-hours/entities/business-hour.entity';
import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessHoursController } from './business-hours.controller';
import { BusinessHoursService } from './business-hours.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessHour, Restaurant])],
  controllers: [BusinessHoursController],
  providers: [BusinessHoursService],
})
export class BusinessHoursModule {}
