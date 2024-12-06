import { Order } from '@/models/order/entities/order.entity';
import { Product } from '@/models/product/entities/product.entity';
import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StockAction {
  ADD = 'add',
  REMOVE = 'remove',
}

@Entity()
@Check(`"amount" > 0`)
export class RestaurantStock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null, nullable: true })
  subId: number;

  @Column({ type: 'numeric', precision: 18, scale: 6 })
  amount: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  modificationDatetime: Date;

  @Column({ type: 'date', default: null, nullable: true })
  expirationDate: Date;

  @Column({ length: 20 })
  stockAction: StockAction;

  @ManyToOne(() => Product, (product) => product.restaurantStocks, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  product: Product;

  @OneToOne(() => Restaurant, (restaurant) => restaurant.stock, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn()
  restaurant: Restaurant;

  @ManyToOne(() => Order, (order) => order.restaurantStocks, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  order: Order | null;
}
