import { IsString, Length } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @Length(3, 50)
  name: string;
}
