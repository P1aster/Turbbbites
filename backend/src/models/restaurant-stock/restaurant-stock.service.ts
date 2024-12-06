import { RestaurantStock } from '@/models/restaurant-stock/entities/restaurant-stock.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantStockDto } from './dto/create-restaurant-stock.dto';
import { UpdateRestaurantStockDto } from './dto/update-restaurant-stock.dto';

@Injectable()
export class RestaurantStockService {
  constructor(
    @InjectRepository(RestaurantStock)
    private restaurantStockRepository: Repository<RestaurantStock>,
  ) {}
  create(createRestaurantStockDto: CreateRestaurantStockDto) {
    return 'This action adds a new restaurantStock';
  }

  findAll() {
    return `This action returns all restaurantStock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurantStock`;
  }

  update(id: number, updateRestaurantStockDto: UpdateRestaurantStockDto) {
    return `This action updates a #${id} restaurantStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurantStock`;
  }
}
