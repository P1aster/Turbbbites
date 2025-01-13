import { DishIngredient } from '@/models/dish-ingredients/entities/dish-ingredient.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class DishIngredientsService {
  constructor(
    @InjectRepository(DishIngredient)
    private dishIngredientsRepository: Repository<DishIngredient>,
  ) {}

  async createIngredients(
    queryRunner: QueryRunner,
    dishId: number,
    products: any[],
  ) {
    const dishIngredients: DishIngredient[] = [];

    for (const product of products) {
      const productExists = await queryRunner.manager.findOne(Product, {
        where: { id: product.id },
      });

      if (!productExists) {
        throw new NotFoundException({
          error: 'Product not found',
          message: `Product with id "${product.id}" not found`,
        });
      }

      dishIngredients.push(
        queryRunner.manager.create(DishIngredient, {
          dishId,
          productId: product.id,
          amount: product.amount,
        }),
      );
    }

    return await queryRunner.manager.create(DishIngredient, dishIngredients);
  }
}
