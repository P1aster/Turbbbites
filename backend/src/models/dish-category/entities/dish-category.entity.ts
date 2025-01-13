import { Dish } from '@/models/dish/entities/dish.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DishCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Dish, (dish) => dish.dishCategory, {
    cascade: true,
  })
  dishes: Dish[];
}
