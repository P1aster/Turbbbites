import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateDishCategoryDto } from './create-dish-category.dto';

export class UpdateDishCategoryDto extends PartialType(CreateDishCategoryDto) {
  @IsInt()
  id: number;
}
