import { DishIngredient } from '@/models/dish-ingredients/entities/dish-ingredient.entity';
import { ProductCategoryModule } from '@/models/product-category/product-category.module';
import { Product } from '@/models/product/entities/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    ProductCategoryModule,
    TypeOrmModule.forFeature([Product, DishIngredient]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
