import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessHourDto } from './create-business-hour.dto';
import { Exclude } from 'class-transformer';

export class UpdateBusinessHourDto extends PartialType(CreateBusinessHourDto) {
  @Exclude()
  restaurantId: number;
}
