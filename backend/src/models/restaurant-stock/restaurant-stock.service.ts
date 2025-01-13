import {
  RestaurantStock,
  StockAction,
} from '@/models/restaurant-stock/entities/restaurant-stock.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { AppRestaurantStockDto } from './dto/add-restaurant-stock.dto';
import { RestaurantService } from '../restaurant/restaurant.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class RestaurantStockService {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    @InjectRepository(RestaurantStock)
    private restaurantStockRepository: Repository<RestaurantStock>,
  ) {}

  //Find one restaurant stock item by id
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    const restaurantStock = await this.restaurantStockRepository.findOne({
      where: { id },
    });

    if (!restaurantStock) {
      throw new BadRequestException({
        error: 'Restaurant Stock not found',
        message: `Restaurant Stock with id "${id}" not found`,
      });
    }

    return restaurantStock;
  }

  // Add a new stock item to the restaurant
  async addStockItem(body: AppRestaurantStockDto) {
    const { productId, restaurantId } = body;
    const restaurant = await this.restaurantService.findOne(restaurantId);
    const product = await this.productService.findOne(productId);
    const restaurantStock = this.restaurantStockRepository.create({
      ...body,
      restaurant,
      product,
    });
    return await this.restaurantStockRepository.save(restaurantStock);
  }

  // Create a new removed restaurant stock item
  async createRemovalRecord(
    queryRunner: QueryRunner,
    originalStock: RestaurantStock,
    amount: number,
  ): Promise<RestaurantStock> {
    const removalRecord = new RestaurantStock();
    removalRecord.restaurant = originalStock.restaurant;
    removalRecord.product = originalStock.product;
    removalRecord.amount = amount;
    removalRecord.stockAction = StockAction.REMOVE;
    removalRecord.subId = originalStock.id;
    removalRecord.expirationDate = null;

    return await queryRunner.manager.save(RestaurantStock, removalRecord);
  }

  async availableStockItemSum(productId: number) {
    await this.productService.findOne(productId);
    const availableStockItemSum = await this.restaurantStockRepository
      .createQueryBuilder('restaurantStock')
      .where('restaurantStock.product = :productId', { productId })
      .andWhere('restaurantStock.stockAction = :stockAction', {
        stockAction: StockAction.ADD,
      })
      .andWhere(
        '(restaurantStock.expirationDate > :expirationDate OR restaurantStock.expirationDate IS NULL)',
        {
          expirationDate: new Date(),
        },
      )
      .select('SUM(restaurantStock.amount)', 'sum')
      .getRawOne();

    return availableStockItemSum || 0;
  }
}
