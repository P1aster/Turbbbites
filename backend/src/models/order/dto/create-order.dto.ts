import {
  IsArray,
  IsNumber,
  ValidateNested,
  ArrayMinSize,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CartDetails {
  @IsNumber()
  dishId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  restaurantId: number;

  @Type(() => CartDetails)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  cart: CartDetails[];
}
