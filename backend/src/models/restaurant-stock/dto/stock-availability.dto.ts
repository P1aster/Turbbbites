import { IsNumber, Min } from 'class-validator';

export class StockAvailabilityDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(0)
  availableAmount: number;
}
