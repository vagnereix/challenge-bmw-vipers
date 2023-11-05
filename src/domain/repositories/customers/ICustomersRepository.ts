import { Customer, Order } from '@prisma/client';

type CustomerType = Pick<Customer, 'name' | 'email'>;

export interface ICustomersRepository {
  create(data: CustomerType): Promise<Customer>;
  getCustomerByEmail(email: string): Promise<Customer | null>;
  getCustomerOrders(id: string): Promise<Order[]>;
}
