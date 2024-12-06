import { DishCategory } from '@/models/dish-category/entities/dish-category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDishCategoryDto } from './dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-category.dto';

@Injectable()
export class DishCategoryService {
  constructor(
    @InjectRepository(DishCategory)
    private dishCategoryRepository: Repository<DishCategory>,
  ) {}
  create(createDishCategoryDto: CreateDishCategoryDto) {
    return this.dishCategoryRepository.save(createDishCategoryDto);
  }

  findAll() {
    return this.dishCategoryRepository.find();
  }

  findOne(id: number) {
    return this.dishCategoryRepository.findOneBy({ id });
  }

  update(id: number, updateDishCategoryDto: UpdateDishCategoryDto) {
    return this.dishCategoryRepository.update({ id }, updateDishCategoryDto);
  }

  remove(id: number) {
    return this.dishCategoryRepository.delete(id);
  }
}
