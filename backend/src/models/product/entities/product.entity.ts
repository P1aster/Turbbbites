import { DishIngredient } from '@/models/dish-ingredients/entities/dish-ingredient.entity';
import { ProductCategory } from '@/models/product-category/entities/product-category.entity';
import { RestaurantStock } from '@/models/restaurant-stock/entities/restaurant-stock.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  productCategory: ProductCategory | null;

  @OneToMany(() => DishIngredient, (dishIngredient) => dishIngredient.product, {
    cascade: true,
  })
  dishIngredients: DishIngredient[];

  @OneToMany(
    () => RestaurantStock,
    (restaurantStock) => restaurantStock.product,
    {
      cascade: true,
    },
  )
  restaurantStocks: RestaurantStock[];
}
