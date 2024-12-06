import { Order } from '@/models/order/entities/order.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class OrderSubscriber implements EntitySubscriberInterface<Order> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Order;
  }

  async afterUpdate(event: UpdateEvent<Order>): Promise<void> {
    if (event.entity) {
      event.entity.editedAt = new Date();
      await event.manager.getRepository(Order).save(event.entity);
    }
  }
}
