import { SpecialHour } from '@/models/special-hours/entities/special-hours.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialHoursController } from './special-hours.controller';
import { SpecialHoursService } from './special-hours.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialHour])],
  controllers: [SpecialHoursController],
  providers: [SpecialHoursService],
})
export class SpecialHoursModule {}
