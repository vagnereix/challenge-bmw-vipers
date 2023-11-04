import { ICustomersRepository } from '@/domain/repositories/customers/ICustomersRepository';

export class GetCustomerOrdersUseCase {
  customersRepository: ICustomersRepository;

  constructor(customersRepository: ICustomersRepository) {
    this.customersRepository = customersRepository;
  }

  async execute(id: string) {
    const orders = await this.customersRepository.getCustomerOrders(id);

    if (!orders) {
      throw new Error('This customer has no orders');
    }

    return orders;
  }
}
