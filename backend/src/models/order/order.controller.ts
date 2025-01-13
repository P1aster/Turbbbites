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
  Query,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderService } from './order.service';
import { Private } from '@/decorators/private.decorator';
import { Role } from '@/decorators/role.decorator';
import { UserRole } from '@/models/user/entities/user.entity';
import { PaginationI } from 'types/pagination';
import { User } from '@/decorators/user.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Private()
  @Role(UserRole.CLIENT)
  @Post()
  create(@User() user, @Body() body: CreateOrderDto) {
    return this.orderService.create(user, body);
  }

  @Private()
  @Role(UserRole.CLIENT)
  @Get()
  findAll(@User() user, @Query() pagination?: PaginationI) {
    return this.orderService.findAll(user, pagination);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Private()
  @Role(UserRole.WORKER)
  @Patch(':id')
  updateStatus(
    @Param(':id', ParseIntPipe) id: number,
    @Body() body: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(id, body);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param(':id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
