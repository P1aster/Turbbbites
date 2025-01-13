import { Order } from '@/models/order/entities/order.entity';
import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  HEAD_ADMIN = 4,
  ADMIN = 3,
  MANAGER = 2,
  WORKER = 1,
  CLIENT = 0,
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  fullname: string;

  @Column({ length: 50 })
  email: string;

  @Exclude()
  @Column({ length: 60 })
  password: string;

  @Column({ type: 'int4', default: UserRole.CLIENT })
  role: number;

  @Column({ length: 10, default: UserStatus.ACTIVE })
  status: string;

  @OneToOne(() => Restaurant, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  restaurant: Restaurant | null;

  @OneToMany(() => Order, (order) => order.user, {})
  orders: Order[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
