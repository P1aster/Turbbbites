import { BusinessHour } from '@/models/business-hours/entities/business-hour.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusinessHourDto } from './dto/create-business-hour.dto';
import { UpdateBusinessHourDto } from './dto/update-business-hour.dto';

@Injectable()
export class BusinessHoursService {
  constructor(
    @InjectRepository(BusinessHour)
    private businessHourRepository: Repository<BusinessHour>,
  ) {}
  create(createBusinessHourDto: CreateBusinessHourDto) {
    return this.businessHourRepository.save(createBusinessHourDto);
  }

  findAll() {
    return this.businessHourRepository.find();
  }

  findOne(id: number) {
    return this.businessHourRepository.findOneBy({ id });
  }

  update(id: number, updateBusinessHourDto: UpdateBusinessHourDto) {
    return this.businessHourRepository.update({ id }, updateBusinessHourDto);
  }

  remove(id: number) {
    return this.businessHourRepository.delete(id);
  }
}
