import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DishCategoryService } from './dish-category.service';
import { CreateDishCategoryDto } from './dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-category.dto';

@Controller('dish-category')
export class DishCategoryController {
  constructor(private readonly dishCategoryService: DishCategoryService) {}

  @Post()
  create(@Body() createDishCategoryDto: CreateDishCategoryDto) {
    return this.dishCategoryService.create(createDishCategoryDto);
  }

  @Get()
  findAll() {
    return this.dishCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDishCategoryDto: UpdateDishCategoryDto,
  ) {
    return this.dishCategoryService.update(+id, updateDishCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishCategoryService.remove(+id);
  }
}
