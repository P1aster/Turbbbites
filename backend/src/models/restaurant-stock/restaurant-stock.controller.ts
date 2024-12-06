import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRestaurantStockDto } from './dto/create-restaurant-stock.dto';
import { UpdateRestaurantStockDto } from './dto/update-restaurant-stock.dto';
import { RestaurantStockService } from './restaurant-stock.service';

@Controller('restaurant-stock')
export class RestaurantStockController {
  constructor(
    private readonly restaurantStockService: RestaurantStockService,
  ) {}

  @Post()
  create(@Body() createRestaurantStockDto: CreateRestaurantStockDto) {
    return this.restaurantStockService.create(createRestaurantStockDto);
  }

  @Get()
  findAll() {
    return this.restaurantStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantStockService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantStockDto: UpdateRestaurantStockDto,
  ) {
    return this.restaurantStockService.update(+id, updateRestaurantStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantStockService.remove(+id);
  }
}
