import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @Transform(({ value }) => {
    if (value) return value?.trim()?.toLowerCase();
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
