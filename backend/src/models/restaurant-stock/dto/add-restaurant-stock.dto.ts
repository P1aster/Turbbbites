import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, Min } from 'class-validator';

export class AppRestaurantStockDto {
  @IsNumber()
  @Min(0)
  amount: number;

  @Transform(({ value }) => {
    if (value) return new Date(value);
  })
  @IsDateString()
  @IsOptional()
  expirationDate?: Date;

  @IsNumber()
  productId: number;

  @IsNumber()
  restaurantId: number;
}
