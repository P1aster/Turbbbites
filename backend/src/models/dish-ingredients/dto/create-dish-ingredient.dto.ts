import { IsNotEmpty, IsString } from 'class-validator';
export class CreateDishIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
