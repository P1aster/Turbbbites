import { SpecialHour } from '@/models/special-hours/entities/special-hours.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialHourDto } from './dto/create-special-hour.dto';
import { UpdateSpecialHourDto } from './dto/update-special-hour.dto';

@Injectable()
export class SpecialHoursService {
  constructor(
    @InjectRepository(SpecialHour)
    private specialHourRepository: Repository<SpecialHour>,
  ) {}
  create(createSpecialHourDto: CreateSpecialHourDto) {
    return this.specialHourRepository.save(createSpecialHourDto);
  }

  findAll() {
    return this.specialHourRepository.find();
  }

  findOne(id: number) {
    return this.specialHourRepository.findOneBy({ id });
  }

  update(id: number, updateSpecialHourDto: UpdateSpecialHourDto) {
    return this.specialHourRepository.update({ id }, updateSpecialHourDto);
  }

  remove(id: number) {
    return this.specialHourRepository.delete(id);
  }
}
