import { Dish } from '@/models/dish/entities/dish.entity';
import {
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateDishDto, CreateDishBodyDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { DishIngredient } from '../dish-ingredients/entities/dish-ingredient.entity';
import { FindAllDishesDto } from './dto/find-all-dishes.dto';
import { DishCategoryService } from '../dish-category/dish-category.service';
import { DishIngredientsService } from '../dish-ingredients/dish-ingredients.service';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

@Injectable()
export class DishService {
  constructor(
    private readonly dishCategoryService: DishCategoryService,
    private readonly dishIngredientsService: DishIngredientsService,
    private dataSource: DataSource,
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  async createWithImageMultipartData(
    body: CreateDishBodyDto,
    file: Express.Multer.File,
  ) {
    let json: any;
    try {
      json = JSON.parse(body.data);
    } catch (error) {
      throw new BadRequestException({
        error: 'Invalid JSON',
        message: error.message,
      });
    }

    const dishInstanceBody = plainToInstance(CreateDishDto, json);
    await validateOrReject(dishInstanceBody);
    const res = await this.create(dishInstanceBody);
    return await this.saveDishImage(res.id, file);
  }

  // Create a new dish
  ///TODO: Fix the transaction
  async create(body: CreateDishDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { products, dishCategoryId, ...dishData } = body;

      // Check for existing dish
      const dishExists = await queryRunner.manager.findOne(Dish, {
        where: { name: dishData.name },
      });
      if (dishExists) {
        throw new ConflictException({
          error: 'Dish already exists',
          message: `Dish with name "${dishData.name}" already exists`,
        });
      }

      // Validate dish category
      const dishCategory =
        await this.dishCategoryService.validateAndGetCategory(
          queryRunner,
          dishCategoryId,
        );

      // Create dish
      const dish = queryRunner.manager.create(Dish, {
        dishCategory,
        ...dishData,
      });
      await queryRunner.manager.save(dish);

      // Create ingredients
      if (products?.length) {
        const ingredients = await this.dishIngredientsService.createIngredients(
          queryRunner,
          dish.id,
          products,
        );
        await queryRunner.manager.save(DishIngredient, ingredients);
      }

      await queryRunner.commitTransaction();

      return await queryRunner.manager.findOne(Dish, {
        where: { id: dish.id },
        relations: ['dishCategory'],
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async saveDishImage(id: number, file: Express.Multer.File) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const dish = await this.findOne(id);
    if (!dish) {
      throw new NotFoundException({
        error: 'Dish not found',
        message: `Dish with id "${id}" not found`,
      });
    }
    dish.imageURL = file.path;
    return await this.dishRepository.save(dish);
  }

  // Find all dishes with optional query parameters for filtering by category
  async findAll(query: FindAllDishesDto) {
    const { categoryId } = query;
    if (categoryId) {
      await this.dishCategoryService.findOne(categoryId);
    }

    const queryBuilder = this.dishRepository
      .createQueryBuilder('dish')
      .leftJoinAndSelect('dish.dishCategory', 'dishCategory')
      .where('dish.available = :available', { available: true });

    if (categoryId) {
      queryBuilder.andWhere('dishCategory.id = :categoryId', {
        categoryId: categoryId,
      });
    }

    const [dishes, total] = await queryBuilder.getManyAndCount();
    return {
      data: dishes,
      total,
    };
  }

  // Find a dish by id
  findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const dish = this.dishRepository.findOne({
      where: { id: id },
      relations: ['dishCategory'],
    });

    if (!dish) {
      throw new NotFoundException({
        error: 'Dish not found',
        message: `Dish with id "${id}" not found`,
      });
    }
    return dish;
  }

  async update(id: number, body: UpdateDishDto) {
    console.log('update dish', id, body);
    throw new Error('Method not implemented.');
  }

  // Remove a dish by id
  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const dish = await this.dishRepository.findOne({ where: { id: id } });
    if (!dish) {
      throw new NotFoundException({
        error: 'Dish not found',
        message: `Dish with id "${id}" not found`,
      });
    }
    await this.dishRepository.delete(id);
  }
}
