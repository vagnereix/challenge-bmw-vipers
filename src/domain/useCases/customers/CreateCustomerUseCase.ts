import { ICustomersRepository } from '@/domain/repositories/customers/ICustomersRepository';
import { Customer } from '@prisma/client';

export class CreateCustomerUseCase {
  customersRepository: ICustomersRepository;

  constructor(customersRepository: ICustomersRepository) {
    this.customersRepository = customersRepository;
  }

  async execute(data: Customer) {
    const customerAlreadyExists =
      await this.customersRepository.getCustomerByEmail(data.email);

    if (customerAlreadyExists) {
      throw new Error('Customer already exists');
    }

    const customer = await this.customersRepository.create(data);

    return customer;
  }
}
