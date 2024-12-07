import { ProductCategoryService } from '@/models/product-category/product-category.service';
import { Product } from '@/models/product/entities/product.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private productCategoryService: ProductCategoryService,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(body: CreateProductDto) {
    const { name } = body;

    const productExists = await this.productRepository.findOne({
      where: { name: name },
    });
    if (productExists) {
      throw new ConflictException({
        error: 'Product already exists',
        message: [`Product with name "${name}" already exists`],
      });
    }

    const product = await this.productRepository.create(body);
    await this.productRepository.save(product);
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: ['No id provided in request params'],
      });
    }

    const product = this.productRepository.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException({
        error: 'Product not found',
        message: [`Product with id "${id}" not found`],
      });
    }
    return product;
  }

  async update(id: number, body: UpdateProductDto) {
    const { productCategoryId } = body;

    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: ['No id provided in request params'],
      });
    }

    const product = await this.productRepository.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException({
        error: 'Product not found',
        message: [`Product with id "${id}" not found`],
      });
    }

    if (productCategoryId) {
      const productCategory =
        await this.productCategoryService.findOne(productCategoryId);
      if (!productCategory) {
        throw new NotFoundException({
          error: 'Product category do not exists',
          message: [
            `Given product category with id "${productCategoryId}" do not exists`,
          ],
        });
      }
    }

    Object.assign(product, body);

    await this.productRepository.update(id, body);
    return product;
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException({
        error: 'Obligatory Parameter Missing',
        message: ['No id provided in request params'],
      });
    }

    const product = await this.productRepository.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException({
        error: 'Product not found',
        message: [`Product with id "${id}" not found`],
      });
    }

    await this.productRepository.delete(id);
  }
}
