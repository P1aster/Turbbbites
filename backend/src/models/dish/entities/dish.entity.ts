import { DishCategory } from '@/models/dish-category/entities/dish-category.entity';
import { DishIngredient } from '@/models/dish-ingredients/entities/dish-ingredient.entity';
import { OrderItem } from '@/models/order-items/entities/order-item.entity';
import {
  Check,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Check(`"price" >= 0`)
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 4 })
  price: string;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date' })
  editedAt: Date;

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => DishCategory, (category) => category.dishes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  dishCategory: DishCategory | null;

  @OneToMany(() => DishIngredient, (dishIngredient) => dishIngredient.dish, {
    cascade: true,
  })
  dishIngredients: DishIngredient[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.dish, {})
  orderItems: OrderItem[];
}
