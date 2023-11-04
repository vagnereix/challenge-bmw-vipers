import { ICustomersRepository } from '@/domain/repositories/customers/ICustomersRepository';

export class GetCustomerUseCase {
  customersRepository: ICustomersRepository;

  constructor(customersRepository: ICustomersRepository) {
    this.customersRepository = customersRepository;
  }

  async execute(email: string) {
    const customer = await this.customersRepository.getCustomerByEmail(email);

    if (!customer) {
      throw new Error('Customer not found');
    }

    return customer;
  }
}
