import { CreateRestaurantDto } from '@/models/restaurant/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '@/models/restaurant/dto/update-restaurant.dto';
import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    return this.create(createRestaurantDto);
  }

  findAll() {
    return this.restaurantRepository.find();
  }

  findOne(id: number) {
    return this.restaurantRepository.findOneBy({ id });
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantRepository.update({ id }, updateRestaurantDto);
  }

  remove(id: number) {
    return this.restaurantRepository.delete(id);
  }
}
