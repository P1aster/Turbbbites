import { ProductCategory } from '@/models/product-category/entities/product-category.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { Assertion } from '../../utils/assertion';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  // Create a new product category
  async create(body: CreateProductCategoryDto) {
    const { name } = body;

    const productExists = await this.productCategoryRepository.findOne({
      where: { name: name },
    });
    if (productExists) {
      throw new ConflictException({
        error: 'Product category already exists',
        message: `Product category with name "${name}" already exists`,
      });
    }
    return await this.productCategoryRepository.save(body);
  }

  // Find all product categories
  findAll() {
    return this.productCategoryRepository.find();
  }

  // Find one product category by id
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    const productCategory = await this.productCategoryRepository.findOne({
      where: { id: id },
    });

    if (!productCategory) {
      throw new NotFoundException({
        error: 'Product category not found',
        message: `Product category with id "${id}" not found`,
      });
    }
    return productCategory;
  }

  // Update a product category
  async update(id: number, body: UpdateProductCategoryDto) {
    const { name } = body;
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const productCategory = await this.findOne(id);
    const productNameExists = await this.productCategoryRepository.findBy({
      name: Equal(name),
      id: Not(id),
    });
    if (!Assertion.isEmptyArray(productNameExists)) {
      throw new ConflictException({
        error: 'Product category already exists',
        message: `Product category with name "${name}" already exists`,
      });
    }

    const serializedData = plainToInstance(UpdateProductCategoryDto, body, {
      exposeUnsetFields: false,
    });

    if (Assertion.isEmptyObject(serializedData)) {
      throw new BadRequestException({
        error: 'No data provided',
        message: 'No data provided to update product category',
      });
    }

    await this.productCategoryRepository.update(id, serializedData);
    return Object.assign(productCategory, serializedData);
  }

  // Remove a product category
  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    await this.findOne(id);
    await this.productCategoryRepository.delete(id);
  }
}
