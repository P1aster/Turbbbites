import { BusinessHour } from '@/models/business-hours/entities/business-hour.entity';
import { Order } from '@/models/order/entities/order.entity';
import { RestaurantStock } from '@/models/restaurant-stock/entities/restaurant-stock.entity';
import { SpecialHour } from '@/models/special-hours/entities/special-hours.entity';
import { User } from '@/models/user/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ length: 50 })
  address: string;

  @Column({ length: 10 })
  postalCode: string;

  @Column({ length: 50 })
  city: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  registrationDate: Date;

  @Column({ type: 'text', nullable: true })
  contactInformation: string;

  @Column({ type: 'date', nullable: true })
  deletedAt: Date;

  @OneToOne(() => User, (user) => user.restaurant)
  user: User;

  @OneToMany(() => BusinessHour, (businessHour) => businessHour.restaurant, {
    cascade: true,
    // eager: true,
  })
  businessHours: BusinessHour[];

  @OneToMany(() => SpecialHour, (specialHour) => specialHour.restaurant, {
    cascade: true,
    // eager: true,
  })
  specialHours: SpecialHour[];

  @OneToOne(
    () => RestaurantStock,
    (restaurantStocks) => restaurantStocks.restaurant,
    {
      cascade: true,
    },
  )
  stock: RestaurantStock;

  @OneToMany(() => Order, (order) => order.restaurant, {})
  orders: Order[];
}
