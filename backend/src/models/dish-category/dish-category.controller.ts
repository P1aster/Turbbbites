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
import { DishCategoryService } from './dish-category.service';
import { CreateDishCategoryDto } from './dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-category.dto';
import { Private } from '@/decorators/private.decorator';
import { Role } from '@/decorators/role.decorator';
import { UserRole } from '@/models/user/entities/user.entity';
import { Public } from '@/decorators/public.decorator';

@Controller('dishCategory')
export class DishCategoryController {
  constructor(private readonly dishCategoryService: DishCategoryService) {}

  @Private()
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() body: CreateDishCategoryDto) {
    return this.dishCategoryService.create(body);
  }

  @Public()
  @Get()
  findAll() {
    return this.dishCategoryService.findAll();
  }

  @Private()
  @Role(UserRole.WORKER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dishCategoryService.findOne(id);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDishCategoryDto,
  ) {
    return this.dishCategoryService.update(id, body);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dishCategoryService.remove(id);
  }
}
