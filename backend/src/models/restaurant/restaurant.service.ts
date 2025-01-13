import { CreateRestaurantDto } from '@/models/restaurant/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '@/models/restaurant/dto/update-restaurant.dto';
import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import {
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Not, DataSource } from 'typeorm';
import { Assertion } from '../../utils/assertion';
import { plainToInstance } from 'class-transformer';
import { format, getDay, isSameDay } from 'date-fns';

@Injectable()
export class RestaurantService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  // Create a new restaurant
  async create(body: CreateRestaurantDto) {
    const { address, city } = body;
    const restaurantExists = await this.restaurantRepository.findOne({
      where: { address, city },
    });

    if (restaurantExists) {
      throw new ConflictException({
        error: 'Restaurant already exists',
        message: `Restaurant with address "${address}" in city "${city}" already exists`,
      });
    }
    return await this.restaurantRepository.save(body);
  }

  // Find all restaurants
  async findAll() {
    return await this.restaurantRepository.find();
  }

  // Find one restaurant by id
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
    });

    if (!restaurant) {
      throw new NotFoundException({
        error: 'Restaurant not found',
        message: `Restaurant with id "${id}" not found`,
      });
    }

    return restaurant;
  }

  // Update a restaurant by id
  async update(id: number, body: UpdateRestaurantDto) {
    const { address, city } = body;

    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    const restaurant = await this.findOne(id);
    const restaurantAddressExists = await this.restaurantRepository.findBy({
      address: Equal(address),
      city: Equal(city),
      id: Not(id),
    });
    if (!Assertion.isEmptyArray(restaurantAddressExists)) {
      throw new ConflictException({
        error: 'Restaurant already exists',
        message: `Restaurant with address "${address}" in city "${city}" already exists`,
      });
    }

    const serializedData = plainToInstance(UpdateRestaurantDto, body, {
      exposeUnsetFields: false,
    });
    if (Assertion.isEmptyObject(serializedData)) {
      throw new BadRequestException({
        error: 'No data provided',
        message: 'No data provided to update restaurant',
      });
    }

    await this.restaurantRepository.update({ id }, serializedData);
    return Object.assign(restaurant, serializedData);
  }

  // Remove a restaurant by id
  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    await this.findOne(id);
    return this.restaurantRepository.delete({ id });
  }

  async isOpen(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const now = new Date();
      const currentDate = format(now, 'yyyy-MM-dd');

      const restaurant = await queryRunner.manager.findOne(Restaurant, {
        where: { id },
        relations: ['specialHours', 'businessHours'],
      });
      if (!restaurant) {
        throw new NotFoundException({
          error: 'Restaurant not found',
          message: `Restaurant with id "${id}" not found`,
        });
      }

      restaurant.specialHours?.forEach((sh) => {
        if (isSameDay(sh.dayDate, currentDate) && sh.isClosed) {
          const [hours, minutes] = sh.openTime.split(':');
          const [closeHours, closeMinutes] = sh.closeTime.split(':');
          const startDateTime = new Date(sh.dayDate);
          startDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
          const endDateTime = new Date(sh.dayDate);
          endDateTime.setHours(parseInt(closeHours), parseInt(closeMinutes), 0);
          if (now >= startDateTime && now <= endDateTime) {
            return false;
          }
        }
      });

      restaurant.businessHours?.forEach((bh) => {
        if (bh.dayOfWeek === (getDay(now) - 1) % 8 && bh.isClosed) {
          const [hours, minutes] = bh.openTime.split(':');
          const [closeHours, closeMinutes] = bh.closeTime.split(':');
          const startDateTime = new Date();
          startDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
          const endDateTime = new Date();
          endDateTime.setHours(parseInt(closeHours), parseInt(closeMinutes), 0);
          if (now >= startDateTime && now <= endDateTime) {
            return false;
          }
        }
      });

      queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
