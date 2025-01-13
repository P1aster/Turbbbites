import { DishCategory } from '@/models/dish-category/entities/dish-category.entity';
import { DishIngredient } from '@/models/dish-ingredients/entities/dish-ingredient.entity';
import { OrderItem } from '@/models/order-items/entities/order-item.entity';
import { unlink } from 'fs/promises';
import {
  AfterRemove,
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
  @AfterRemove()
  async removeImage() {
    if (this.imageURL) {
      await unlink(this.imageURL);
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  price: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  editedAt: Date;

  @Column({ default: true })
  available: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageURL: string;

  @ManyToOne(() => DishCategory, (category) => category.dishes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
    eager: true,
  })
  dishCategory: DishCategory | null;

  @OneToMany(() => DishIngredient, (dishIngredient) => dishIngredient.dish, {
    cascade: true,
  })
  dishIngredients: DishIngredient[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.dish, {})
  orderItems: OrderItem[];
}
