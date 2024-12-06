import { Product } from '@/models/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Product, (product) => product.productCategory, {
    cascade: true,
    eager: true,
  })
  products: Product[];
}
