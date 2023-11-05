import { ICustomersRepository } from '@/domain/repositories/customers/ICustomersRepository';
import { Customer } from '@prisma/client';

type CustomerType = Pick<Customer, 'name' | 'email'>;

export class CreateCustomerUseCase {
  customersRepository: ICustomersRepository;

  constructor(customersRepository: ICustomersRepository) {
    this.customersRepository = customersRepository;
  }

  async execute(data: CustomerType) {
    const customerAlreadyExists =
      await this.customersRepository.getCustomerByEmail(data.email);

    if (customerAlreadyExists) {
      throw new Error('Customer already exists');
    }

    const customer = await this.customersRepository.create(data);

    return customer;
  }
}
