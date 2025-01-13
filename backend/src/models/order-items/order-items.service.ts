import { OrderItem } from '@/models/order-items/entities/order-item.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderService } from '../order/order.service';
import { DishService } from '../dish/dish.service';
import { Order } from '../order/entities/order.entity';
import { Dish } from '../dish/entities/dish.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    private readonly orderService: OrderService,
    private readonly dishService: DishService,
    private dataSource: DataSource,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}
  async create(body: CreateOrderItemDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { orderId, dishId, quantity } = body;
      const order = await queryRunner.manager.findOne(Order, {
        where: { id: orderId },
      });
      if (!order) {
        throw new NotFoundException({
          error: 'Order not found',
          message: `Order with id "${orderId}" not found`,
        });
      }
      const dish = await queryRunner.manager.findOne(Dish, {
        where: { id: dishId },
      });
      if (!dish) {
        throw new NotFoundException({
          error: 'Dish not found',
          message: `Dish with id "${dishId}" not found`,
        });
      }

      const orderItem = await queryRunner.manager.create(OrderItem, {
        order,
        dish,
        quantity,
      });

      await queryRunner.manager.save(OrderItem, orderItem);
      await queryRunner.commitTransaction();

      return orderItem;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
