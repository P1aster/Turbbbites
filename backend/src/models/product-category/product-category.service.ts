import { ProductCategory } from '@/models/product-category/entities/product-category.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(body: CreateProductCategoryDto) {
    const { name } = body;

    const productExists = await this.productCategoryRepository.findOne({
      where: { name: name },
    });
    if (productExists) {
      throw new ConflictException({
        title: 'Product category already exists',
        message: `Product category with name "${name}" already exists`,
      });
    }

    const productCategory = await this.productCategoryRepository.create(body);
    await this.productCategoryRepository.save(productCategory);
    return productCategory;
  }

  findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        title: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    const productCategory = this.productCategoryRepository.findOne({
      where: { id: id },
    });

    if (!productCategory) {
      throw new NotFoundException({
        title: 'Product category not found',
        message: `Product category with id "${id}" not found`,
      });
    }
    return productCategory;
  }

  findAll() {
    return this.productCategoryRepository.find();
  }

  async update(id: number, body: UpdateProductCategoryDto) {
    // const { productCategoryId } = data;

    if (!id) {
      throw new BadRequestException({
        title: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    const productCategory = await this.productCategoryRepository.findOne({
      where: { id: id },
    });

    if (!productCategory) {
      throw new NotFoundException({
        title: 'Product category not found',
        message: `Product category with id "${id}" not found`,
      });
    }
    Object.assign(productCategory, body);

    await this.productCategoryRepository.update(id, body);
    return productCategory;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        title: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    const product = await this.productCategoryRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException({
        title: 'Product category not found',
        message: `Product category with id "${id}" not found`,
      });
    }

    await this.productCategoryRepository.delete(id);
  }
}
