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
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Private()
  @Role(UserRole.ADMIN)
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Private()
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.WORKER)
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Private()
  @Role(UserRole.ADMIN, UserRole.MANAGER, UserRole.WORKER)
  @Get(':id')
  findOne(@Param(':id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    return this.productService.update(id, body);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
