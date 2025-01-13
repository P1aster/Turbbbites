import { Order, OrderStatus } from '@/models/order/entities/order.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PaginationI } from 'types/pagination';
import { UserSessionI } from 'types/userSession';
import { UserRole } from '../user/entities/user.entity';
import { RestaurantService } from '../restaurant/restaurant.service';
import { UserService } from '../user/user.service';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Dish } from '../dish/entities/dish.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly userService: UserService,
    private readonly restaurantService: RestaurantService,
    private dataSource: DataSource,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  async create(userSession: UserSessionI, body: CreateOrderDto) {
    const { restaurantId, cart } = body;

    const user = await this.userService.findOne(userSession.userId);
    const restaurant = await this.restaurantService.findOne(restaurantId);

    const isClient = user.role === UserRole.CLIENT;
    let status: OrderStatus = OrderStatus.WAITING_PAYMENT;

    if (!isClient) {
      status = OrderStatus.PENDING;
      if (user.restaurant?.id !== restaurantId) {
        throw new UnauthorizedException({
          error: 'Unauthorized',
          message: 'You can only create orders for your assigned restaurant',
        });
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const dishesObjArr: Dish[] = [];
      const orderItems: OrderItem[] = [];
      let totalPrice: number = 0;

      ////TODO: Implement ArrayContains
      for (let i = 0; i < cart.length; i++) {
        const dish = await queryRunner.manager.findOne(Dish, {
          where: { id: cart[i].dishId },
        });
        if (!dish) {
          throw new NotFoundException({
            error: 'Dish not found',
            message: `Dish with id "${cart[i].dishId}" not found`,
          });
        }
        dishesObjArr.push(dish);
        totalPrice += dish.price * cart[i].quantity;
      }

      const order = await queryRunner.manager.save(Order, {
        status,
        user,
        restaurant,
        totalPrice,
      });

      for (let i = 0; i < cart.length; i++) {
        const orderItem = await queryRunner.manager.create(OrderItem, {
          order: order,
          dish: dishesObjArr[i],
          quantity: cart[i].quantity,
        });

        orderItems.push(orderItem);
      }

      await queryRunner.manager.save(OrderItem, orderItems);
      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // find all orders
  async findAll(userSession: UserSessionI, pagination?: PaginationI) {
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const skip = (page - 1) * pageSize;

    const user = await this.userService.findOne(userSession.userId);

    // const baseFields = [
    //   'order.id',
    //   'order.status',
    //   'order.totalPrice',
    //   'order.editedAt',
    // ];

    // const userFields =
    //   user.role !== UserRole.CLIENT
    //     ? ['user.id', 'user.fullname', 'user.email']
    //     : [
    //         'restaurant.id',
    //         'restaurant.address',
    //         'restaurant.postalCode',
    //         'restaurant.city',
    //       ];

    const queryBuilder = this.orderRepository.createQueryBuilder('order');
    // .leftJoinAndSelect('order.restaurant', 'restaurant')
    // .leftJoinAndSelect('order.user', 'user')
    // .select(baseFields);

    if (user.role === UserRole.CLIENT) {
      queryBuilder
        .orderBy(`order.status='completed'`, 'DESC')
        .addOrderBy(`order.status='canceled'`, 'DESC')
        .addOrderBy(`order.status='pending'`, 'DESC')
        .addOrderBy('order.createdAt', 'DESC');
    } else if ([UserRole.WORKER, UserRole.MANAGER].includes(user.role)) {
      queryBuilder.where('restaurant.id = :restaurantId', {
        restaurantId: user.restaurant.id,
      });
    }

    const [orders, total] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();
    return {
      data: orders,
      total: total,
    };
  }

  // find order by id
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException({
        error: 'Order not found',
        message: `Order with id "${id}" not found`,
      });
    }

    return order;
  }

  // update order status
  async updateStatus(id: number, body: UpdateOrderStatusDto) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException({
        error: 'Order not found',
        message: `Order with id "${id}" not found`,
      });
    }

    await this.orderRepository.update(id, body);
    return Object.assign(order, body);
  }

  // delete order
  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException({
        error: 'Order not found',
        message: `Order with id "${id}" not found`,
      });
    }

    return await this.orderRepository.remove(order);
  }
}
