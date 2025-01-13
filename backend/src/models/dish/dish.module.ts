import { Dish } from '@/models/dish/entities/dish.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { DishCategoryModule } from '../dish-category/dish-category.module';
import { DishIngredientsModule } from '../dish-ingredients/dish-ingredients.module';

@Module({
  imports: [
    DishCategoryModule,
    DishIngredientsModule,
    TypeOrmModule.forFeature([Dish]),
  ],
  controllers: [DishController],
  providers: [DishService],
  exports: [DishService],
})
export class DishModule {}
