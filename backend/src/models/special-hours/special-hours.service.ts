import { SpecialHour } from '@/models/special-hours/entities/special-hours.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialHourDto } from './dto/create-special-hour.dto';
import { RestaurantService } from '../restaurant/restaurant.service';

@Injectable()
export class SpecialHoursService {
  constructor(
    private readonly restaurantService: RestaurantService,
    @InjectRepository(SpecialHour)
    private specialHourRepository: Repository<SpecialHour>,
  ) {}

  // Create a new special hour
  async create(body: CreateSpecialHourDto) {
    const { restaurantId, dayDate, closeTime, openTime, isClosed } = body;

    const restaurant = await this.restaurantService.findOne(restaurantId);

    if ((openTime && !closeTime) || (!openTime && closeTime)) {
      throw new BadRequestException({
        error: 'Invalid Parameters',
        message: 'Both openTime and closeTime must be provided or non',
      });
    }
    return await this.specialHourRepository.save({
      restaurant,
      dayDate,
      openTime,
      closeTime,
      isClosed,
    });
  }

  // Find all special hours
  async findAllAssigned(restaurantId: number) {
    if (!restaurantId) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No restaurantId provided in request params',
      });
    }

    return await this.specialHourRepository.findBy({
      restaurant: { id: restaurantId },
    });
  }
  // Find one special hour
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const specialHour = await this.specialHourRepository.findOne({
      where: { id: id },
    });

    if (!specialHour) {
      throw new BadRequestException({
        error: 'Special Hour Not Found',
        message: 'No special hour found with the provided id',
      });
    }

    return specialHour;
  }

  // Remove a special hour
  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    await this.findOne(id);
    return this.specialHourRepository.delete(id);
  }
}
