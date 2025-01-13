import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';
import { Private } from '@/decorators/private.decorator';
import { Role } from '@/decorators/role.decorator';
import { UserRole } from '@/models/user/entities/user.entity';
import { Public } from '@/decorators/public.decorator';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Private()
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() body: CreateRestaurantDto) {
    return this.restaurantService.create(body);
  }

  @Public()
  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Private()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.findOne(id);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(id, body);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.remove(id);
  }
}
