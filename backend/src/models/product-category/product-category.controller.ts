import { Private } from '@/decorators/private.decorator';
import { Role } from '@/decorators/role.decorator';
import { UserRole } from '@/models/user/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoryService } from './product-category.service';

@Controller('productCategory')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Private()
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() body: CreateProductCategoryDto) {
    return this.productCategoryService.create(body);
  }

  @Private()
  @Role(UserRole.WORKER)
  @Get()
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Private()
  @Role(UserRole.WORKER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productCategoryService.findOne(id);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateProductCategoryDto) {
    return this.productCategoryService.update(id, body);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productCategoryService.remove(id);
  }
}
