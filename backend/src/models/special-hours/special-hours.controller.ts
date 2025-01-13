import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateSpecialHourDto } from './dto/create-special-hour.dto';
import { SpecialHoursService } from './special-hours.service';
import { UserRole } from '../user/entities/user.entity';
import { Private } from '@/decorators/private.decorator';
import { Role } from '@/decorators/role.decorator';

@Controller('specialHours')
export class SpecialHoursController {
  constructor(private readonly specialHoursService: SpecialHoursService) {}

  @Private()
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() body: CreateSpecialHourDto) {
    return this.specialHoursService.create(body);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.specialHoursService.remove(id);
  }
}
