import { OrderItem } from '@/models/order-items/entities/order-item.entity';
import { RestaurantStock } from '@/models/restaurant-stock/entities/restaurant-stock.entity';
import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import { User } from '@/models/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  IDLE = 'idle',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 12, scale: 4 })
  totalPrice: string;

  @Column({ length: 20, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  editedAt: Date;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User | null;

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
  })
  items: OrderItem[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  restaurant: Restaurant;

  @OneToMany(() => RestaurantStock, (stock) => stock.order, {
    cascade: true,
  })
  restaurantStocks: RestaurantStock[];
}
