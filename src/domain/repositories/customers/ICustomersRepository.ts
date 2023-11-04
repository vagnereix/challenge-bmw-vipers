import { Customer, Order } from '@prisma/client';

export interface ICustomersRepository {
  create(data: Customer): Promise<Customer>;
  getCustomerByEmail(email: string): Promise<Customer | null>;
  getCustomerOrders(id: string): Promise<Order[]>;
}
