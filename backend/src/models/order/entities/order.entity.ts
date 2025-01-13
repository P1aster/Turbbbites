import { OrderItem } from '@/models/order-items/entities/order-item.entity';
import { RestaurantStock } from '@/models/restaurant-stock/entities/restaurant-stock.entity';
import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import { User } from '@/models/user/entities/user.entity';
import {
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  COLLECTED = 'collected',
  CANCELLED = 'cancelled',
  WAITING_PAYMENT = 'waitingPayment',
}

@Entity()
export class Order {
  @AfterUpdate()
  updateOrderEditedAt() {
    this.editedAt = new Date();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  totalPrice: number;

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
  orderItems: OrderItem[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @OneToMany(() => RestaurantStock, (stock) => stock.order, {
    cascade: true,
  })
  restaurantStocks: RestaurantStock[];
}
