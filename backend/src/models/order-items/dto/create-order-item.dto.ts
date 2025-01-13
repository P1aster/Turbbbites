import { IsNumber, Min } from 'class-validator';
export class CreateOrderItemDto {
  @IsNumber()
  orderId: number;

  @IsNumber()
  dishId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
