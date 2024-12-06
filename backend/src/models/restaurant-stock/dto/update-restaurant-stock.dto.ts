import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantStockDto } from './create-restaurant-stock.dto';

export class UpdateRestaurantStockDto extends PartialType(CreateRestaurantStockDto) {}
