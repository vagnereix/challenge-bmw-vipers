import { Order } from '@prisma/client';

export interface IOrdersRepository {
  create(data: Order): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  update(data: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}
