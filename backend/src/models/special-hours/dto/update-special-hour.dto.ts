import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialHourDto } from './create-special-hour.dto';
import { Exclude } from 'class-transformer';

export class UpdateSpecialHourDto extends PartialType(CreateSpecialHourDto) {
  @Exclude()
  restaurantId?: number;
}
