import { IOrdersRepository } from '@/domain/repositories/orders/IOrdersRepository';

export class GetCustomerOrdersUseCase {
  ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(id: string) {
    const orders = await this.ordersRepository.getCustomerOrders(id);

    if (!orders) {
      throw new Error('This customer has no orders');
    }

    return orders;
  }
}
