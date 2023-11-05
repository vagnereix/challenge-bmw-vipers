import { Customer } from '@prisma/client';

type CustomerTypeDTO = Pick<Customer, 'name' | 'email'>;

export interface ICustomersRepository {
  create(data: CustomerTypeDTO): Promise<Customer>;
  getCustomerByEmail(email: string): Promise<Customer | null>;
}
