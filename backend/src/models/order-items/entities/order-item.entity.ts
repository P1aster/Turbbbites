import { Dish } from '@/models/dish/entities/dish.entity';
import { Order } from '@/models/order/entities/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @Column({ type: 'int4' })
  quantity: number;

  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  dishId: number;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Dish, (dish) => dish.orderItems, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'dishId' })
  dish: Dish;
}
