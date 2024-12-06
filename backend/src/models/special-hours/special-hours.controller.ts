import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSpecialHourDto } from './dto/create-special-hour.dto';
import { UpdateSpecialHourDto } from './dto/update-special-hour.dto';
import { SpecialHoursService } from './special-hours.service';

@Controller('special-hours')
export class SpecialHoursController {
  constructor(private readonly specialHoursService: SpecialHoursService) {}

  @Post()
  create(@Body() createSpecialHourDto: CreateSpecialHourDto) {
    return this.specialHoursService.create(createSpecialHourDto);
  }

  @Get()
  findAll() {
    return this.specialHoursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialHoursService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialHourDto: UpdateSpecialHourDto,
  ) {
    return this.specialHoursService.update(+id, updateSpecialHourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialHoursService.remove(+id);
  }
}
