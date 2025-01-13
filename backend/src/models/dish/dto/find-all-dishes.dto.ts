import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindAllDishesDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
