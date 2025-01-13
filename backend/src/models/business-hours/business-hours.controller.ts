import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { BusinessHoursService } from './business-hours.service';
import { CreateBusinessHourDto } from './dto/create-business-hour.dto';
import { UserRole } from '../user/entities/user.entity';
import { Private } from '@/decorators/private.decorator';
import { Role } from '@/decorators/role.decorator';

@Controller('businessHours')
export class BusinessHoursController {
  constructor(private readonly businessHoursService: BusinessHoursService) {}

  @Private()
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() body: CreateBusinessHourDto) {
    return this.businessHoursService.create(body);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.businessHoursService.remove(id);
  }
}
