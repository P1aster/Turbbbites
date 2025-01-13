import { DishCategory } from '@/models/dish-category/entities/dish-category.entity';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, QueryRunner, Repository } from 'typeorm';
import { CreateDishCategoryDto } from './dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-category.dto';
import { Assertion } from '../../utils/assertion';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DishCategoryService {
  constructor(
    @InjectRepository(DishCategory)
    private dishCategoryRepository: Repository<DishCategory>,
  ) {}
  // Create a new dish category
  async create(body: CreateDishCategoryDto) {
    const { name } = body;

    const dishCategoryExists = await this.dishCategoryRepository.findOne({
      where: { name },
    });

    if (dishCategoryExists) {
      throw new ConflictException({
        error: 'Dish category already exists',
        message: `Dish category with name "${name}" already exists`,
      });
    }

    return await this.dishCategoryRepository.save(body);
  }

  // Find all dish categories
  findAll() {
    return this.dishCategoryRepository.find();
  }

  // Find one dish category by id
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const dishCategory = await this.dishCategoryRepository.findOne({
      where: { id },
    });

    if (!dishCategory) {
      throw new NotFoundException({
        error: 'Dish category not found',
        message: `Dish category with id "${id}" not found`,
      });
    }
    return dishCategory;
  }

  // Update a dish category by id
  async update(id: number, body: UpdateDishCategoryDto) {
    const { name } = body;

    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const dishCategory = await this.findOne(id);
    const dishNameExists = await this.dishCategoryRepository.findBy({
      name: Equal(name),
      id: Not(id),
    });
    if (!Assertion.isEmptyArray(dishNameExists)) {
      throw new ConflictException({
        error: 'Dish category already exists',
        message: `Dish category with name "${name}" already exists`,
      });
    }

    const serializedData = plainToInstance(UpdateDishCategoryDto, body, {
      exposeUnsetFields: false,
    });

    if (Assertion.isEmptyObject(serializedData)) {
      throw new BadRequestException({
        error: 'No data provided',
        message: 'No data provided to update product category',
      });
    }

    await this.dishCategoryRepository.update(id, body);
    return Object.assign(dishCategory, serializedData);
  }

  // Remove a dish category by id
  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    await this.findOne(id);
    await this.dishCategoryRepository.delete({ id });
  }

  async validateAndGetCategory(queryRunner: QueryRunner, categoryId: number) {
    if (!categoryId) return null;
    const dishCategory = await queryRunner.manager.findOne(DishCategory, {
      where: { id: categoryId },
    });

    if (!dishCategory) {
      throw new NotFoundException({
        error: 'Dish category not found',
        message: `Dish category with id "${categoryId}" not found`,
      });
    }

    return dishCategory;
  }
}
