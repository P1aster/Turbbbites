import { ProductCategoryService } from '@/models/product-category/product-category.service';
import { Product } from '@/models/product/entities/product.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Assertion } from '../../utils/assertion';
import { plainToInstance } from 'class-transformer';
import { ProductCategory } from '../product-category/entities/product-category.entity';

@Injectable()
export class ProductService {
  constructor(
    private productCategoryService: ProductCategoryService,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Create a product
  async create(body: CreateProductDto) {
    const { name, productCategoryId, available, description } = body;
    let productCategory = null;

    const productExists = await this.productRepository.findOne({
      where: { name: name },
    });
    if (productExists) {
      throw new ConflictException({
        error: 'Product already exists',
        message: `Product with name "${name}" already exists`,
      });
    }

    if (productCategoryId) {
      productCategory =
        await this.productCategoryService.findOne(productCategoryId);
    }

    const product = await this.productRepository.create({
      name,
      description,
      available,
      productCategory,
    });
    await this.productRepository.save(product);
    return product;
  }

  // Get all products
  findAll() {
    return this.productRepository.find();
  }

  // Get one product
  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    const product = await this.productRepository.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException({
        error: 'Product not found',
        message: `Product with id "${id}" not found`,
      });
    }
    return product;
  }

  async update(id: number, body: UpdateProductDto) {
    const { productCategoryId, ...bodyData } = body;
    let productCategory: ProductCategory | null = null;

    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }

    const product = await this.findOne(id);
    const productExists = await this.productRepository.findBy({
      name: Equal(bodyData.name),
      id: Not(id),
    });

    if (!Assertion.isEmptyArray(productExists)) {
      throw new ConflictException({
        error: 'Product already exists',
        message: `Product with name "${bodyData.name}" already exists`,
      });
    }

    const serializedData = plainToInstance(UpdateProductDto, bodyData, {
      exposeUnsetFields: false,
    });

    if (Assertion.isEmptyObject(serializedData)) {
      throw new BadRequestException({
        error: 'No data provided',
        message: 'No data provided to update product',
      });
    }
    if (productCategoryId) {
      productCategory =
        await this.productCategoryService.findOne(productCategoryId);
    } else {
      productCategory = product.productCategory;
    }
    await this.productRepository.update(id, {
      productCategory: productCategory,
      ...serializedData,
    });
    return Object.assign(product, serializedData);
  }

  // Remove a product
  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: 'No id provided in request params',
      });
    }
    await this.findOne(id);
    await this.productRepository.delete(id);
  }
}
