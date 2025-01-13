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
  amount: number;

  @PrimaryColumn()
  dishId: number;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Dish, (dish) => dish.dishIngredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'dishId' })
  dish: Dish;

  @ManyToOne(() => Product, (product) => product.dishIngredients, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
