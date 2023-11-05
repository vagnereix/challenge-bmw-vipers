import { Order } from '@prisma/client';

type OrderTypeDTO = Pick<Order, 'title' | 'customerId'>;

export interface IOrdersRepository {
  create(data: OrderTypeDTO): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  getCustomerOrders(customerId: string): Promise<Order[]>;
  update(data: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}
