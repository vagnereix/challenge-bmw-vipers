import { IOrdersRepository } from '@/domain/repositories/orders/IOrdersRepository';

export class DeleteCustomerOrderUseCase {
  ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(id: string) {
    await this.ordersRepository.delete(id);
  }
}
