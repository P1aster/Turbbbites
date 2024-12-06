import { PartialType } from '@nestjs/mapped-types';
import { CreateDishIngredientDto } from './create-dish-ingredient.dto';

export class UpdateDishIngredientDto extends PartialType(CreateDishIngredientDto) {}
