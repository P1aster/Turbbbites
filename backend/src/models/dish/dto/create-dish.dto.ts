import {
  IsArray,
  IsOptional,
  IsString,
  Min,
  IsNotEmpty,
  IsNumber,
  ArrayUnique,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { DishIngredientAmount } from './dish-ingredient-amount';
import { Transform } from 'class-transformer';

export class CreateDishBodyDto {
  @IsString()
  @IsNotEmpty()
  data: string;
}

export class CreateDishDto {
  @Transform(({ value }) => {
    if (value) return value?.trim()?.toLowerCase();
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @IsOptional()
  dishCategoryId?: number;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsArray()
  @ArrayUnique()
  @ValidateNested({ each: true })
  @IsOptional()
  products?: DishIngredientAmount[];
}
