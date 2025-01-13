import { PartialType } from '@nestjs/mapped-types';
import { CreateDishDto } from './create-dish.dto';
import { ArrayUnique, IsArray, IsNumber, IsOptional } from 'class-validator';

export class UpdateDishDto extends PartialType(CreateDishDto) {
  @IsArray()
  @ArrayUnique()
  @IsNumber({}, { each: true })
  @IsOptional()
  productIdsToDelete?: number[];
}
