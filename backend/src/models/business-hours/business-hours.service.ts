import { BusinessHour } from '@/models/business-hours/entities/business-hour.entity';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusinessHourDto } from './dto/create-business-hour.dto';
import { RestaurantService } from '../restaurant/restaurant.service';
import { isWithinInterval, set } from 'date-fns';

@Injectable()
export class BusinessHoursService {
  constructor(
    private readonly restaurantService: RestaurantService,
    @InjectRepository(BusinessHour)
    private businessHourRepository: Repository<BusinessHour>,
  ) {}

  // Create a new business hour
  async create(body: CreateBusinessHourDto) {
    const { restaurantId, dayOfWeek, closeTime, openTime, isClosed } = body;

    const restaurant = await this.restaurantService.findOne(restaurantId);

    if ((openTime && !closeTime) || (!openTime && closeTime)) {
      throw new BadRequestException({
        error: 'Invalid Parameters',
        message: 'Both openTime and closeTime must be provided or non',
      });
    }

    if (openTime && closeTime) {
      const overlap = await this.hasOverlap({
        restaurantId,
        dayOfWeek,
        openTime,
        closeTime,
      });

      if (overlap) {
        throw new BadRequestException({
          error: 'Bad Request',
          message: 'Time range overlaps with an existing schedule',
        });
      }
    }

    return await this.businessHourRepository.save({
      restaurant,
      dayOfWeek,
      openTime,
      closeTime,
      isClosed,
    });
  }

  // Find all business hours
  async findAllAssigned(restaurantId: number) {
    if (!restaurantId) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No restaurantId provided in request params',
      });
    }

    return await this.businessHourRepository.findBy({
      restaurant: { id: restaurantId },
    });
  }

  // Find one business hour by id
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    const businessHour = await this.businessHourRepository.findOne({
      where: { id: id },
    });

    if (!businessHour) {
      throw new NotFoundException({
        error: 'Business hour not found',
        message: `Business hour with id "${id}" not found`,
      });
    }

    return businessHour;
  }

  // Remove a business hour by id
  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    await this.findOne(id);
    return this.businessHourRepository.delete(id);
  }

  async hasOverlap({
    restaurantId,
    dayOfWeek,
    openTime,
    closeTime,
  }: {
    restaurantId: number;
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
  }) {
    const sameDayHours = await this.businessHourRepository.find({
      where: { restaurant: { id: restaurantId }, dayOfWeek },
    });
    const hasOverlap = sameDayHours.some((hours) => {
      return this.checkTimeOverlap(
        openTime,
        closeTime,
        hours.openTime,
        hours.closeTime,
      );
    });

    if (hasOverlap) {
      throw new BadRequestException({
        error: 'Bad Request',
        message: 'Time range overlaps with an existing schedule',
      });
    }
    return false;
  }

  checkTimeOverlap(
    startTime1: string,
    endTime1: string,
    startTime2: string,
    endTime2: string,
  ) {
    // Helper function to convert HH:mm to Date object
    const parseTimeString = (timeStr: string): Date => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return set(new Date(), {
        hours,
        minutes,
        seconds: 0,
        milliseconds: 0,
      });
    };

    // Parse all times to Date objects
    const start1 = parseTimeString(startTime1);
    const end1 = parseTimeString(endTime1);
    const start2 = parseTimeString(startTime2);
    const end2 = parseTimeString(endTime2);

    // Handle cases where end time is before start time (spans midnight)
    const adjustForMidnight = (start: Date, end: Date): Date => {
      if (end < start) {
        return set(end, { date: end.getDate() + 1 });
      }
      return end;
    };

    const adjustedEnd1 = adjustForMidnight(start1, end1);
    const adjustedEnd2 = adjustForMidnight(start2, end2);

    // Check if either time range falls within the other
    return (
      isWithinInterval(start1, { start: start2, end: adjustedEnd2 }) ||
      isWithinInterval(start2, { start: start1, end: adjustedEnd1 }) ||
      isWithinInterval(end1, { start: start2, end: adjustedEnd2 }) ||
      isWithinInterval(end2, { start: start1, end: adjustedEnd1 })
    );
  }
}
