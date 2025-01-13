import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @Transform(({ value }) => {
    if (value) return value?.trim()?.toLowerCase();
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsNumber()
  @IsOptional()
  productCategoryId?: number;
}
