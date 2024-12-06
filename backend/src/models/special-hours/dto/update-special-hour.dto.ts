import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateSpecialHourDto } from './create-special-hour.dto';

export class UpdateSpecialHourDto extends PartialType(CreateSpecialHourDto) {
  @IsInt()
  id: number;
}
