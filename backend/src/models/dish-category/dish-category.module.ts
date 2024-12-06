import { DishCategory } from '@/models/dish-category/entities/dish-category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishCategoryController } from './dish-category.controller';
import { DishCategoryService } from './dish-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([DishCategory])],
  controllers: [DishCategoryController],
  providers: [DishCategoryService],
})
export class DishCategoryModule {}
