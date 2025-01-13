import { IsNumber, Min } from 'class-validator';

export class DishIngredientAmount {
  @IsNumber()
  id: number;

  @IsNumber()
  @Min(0)
  amount: number;
}
