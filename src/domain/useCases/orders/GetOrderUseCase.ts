import { IOrdersRepository } from '@/domain/repositories/orders/IOrdersRepository';

export class GetOrderUseCase {
  ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(id: string) {
    const order = await this.ordersRepository.getOrderById(id);

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
}
