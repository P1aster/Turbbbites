import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BusinessHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int4' })
  dayOfWeek: number;

  @Column({ type: 'time', default: null, nullable: true })
  openTime: string;

  @Column({ type: 'time', default: null, nullable: true })
  closeTime: string;

  @Column({ type: 'bool', default: false })
  isClosed: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.businessHours, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  restaurant: Restaurant;
}
