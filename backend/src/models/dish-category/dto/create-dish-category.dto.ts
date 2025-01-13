import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDishCategoryDto {
  @Transform(({ value }) => {
    if (value) {
      return value?.trim()?.toLowerCase();
    }
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
