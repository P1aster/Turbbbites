import { DishIngredient } from '@/models/dish-ingredients/entities/dish-ingredient.entity';
import { Product } from '@/models/product/entities/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishIngredientsController } from './dish-ingredients.controller';
import { DishIngredientsService } from './dish-ingredients.service';

@Module({
  imports: [TypeOrmModule.forFeature([DishIngredient, Product])],
  controllers: [DishIngredientsController],
  providers: [DishIngredientsService],
  exports: [DishIngredientsService],
})
export class DishIngredientsModule {}
