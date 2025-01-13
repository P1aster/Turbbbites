import { PartialType } from '@nestjs/mapped-types';
import { CreateDishCategoryDto } from './create-dish-category.dto';

export class UpdateDishCategoryDto extends PartialType(CreateDishCategoryDto) {}
