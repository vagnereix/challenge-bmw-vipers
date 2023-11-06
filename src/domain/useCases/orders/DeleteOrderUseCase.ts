import { IOrdersRepository } from '@/domain/repositories/orders/IOrdersRepository';

export class DeleteOrderUseCase {
  ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(id: string) {
    await this.ordersRepository.delete(id);
  }
}
