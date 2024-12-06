import { Restaurant } from '@/models/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecialHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dayDate: Date;

  @Column({ type: 'time', default: null, nullable: true })
  openTime: string;

  @Column({ type: 'time', default: null, nullable: true })
  closeTime: string;

  @Column({ type: 'bool', default: false })
  isClosed: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.specialHours, {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT',
  })
  restaurant: Restaurant;
}
