import { Dish } from '@/models/dish/entities/dish.entity';
import { Order } from '@/models/order/entities/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderItem {
  @Column({ type: 'int4' })
  quantity: number;

  @PrimaryColumn()
  orderId: number; // Foreign key for Dish

  @PrimaryColumn()
  dishId: number; // Foreign key for Product

  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' }) // Connects orderId to the primary key of Order
  order: Order;

  @ManyToOne(() => Dish, (dish) => dish.orderItems, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'dishId' }) // Connects dishId to the primary key of Dish
  dish: Dish;
}
