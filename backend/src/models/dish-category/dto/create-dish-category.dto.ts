import { Length } from 'class-validator';

export class CreateDishCategoryDto {
  @Length(1, 50)
  name: string;
}
