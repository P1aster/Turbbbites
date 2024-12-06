import { Dish } from '@/models/dish/entities/dish.entity';
import { Product } from '@/models/product/entities/product.entity';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
@Check(`"amount" > 0`)
export class DishIngredient {
  @Column({ type: 'decimal', precision: 18, scale: 6 })
  amount: string;

  @PrimaryColumn()
  dishId: number; // Foreign key for Dish

  @PrimaryColumn()
  productId: number; // Foreign key for Product

  @ManyToOne(() => Dish, (dish) => dish.dishIngredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    // cascade: true,
  })
  @JoinColumn({ name: 'dishId' }) // Connects dishId to the primary key of Dish
  dish: Dish;

  @ManyToOne(() => Product, (product) => product.dishIngredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'productId' }) // Connects productId to the primary key of Product
  product: Product;
}
