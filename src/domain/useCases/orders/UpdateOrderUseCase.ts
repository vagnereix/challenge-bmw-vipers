import { IOrdersRepository } from '@/domain/repositories/orders/IOrdersRepository';
import { Order } from '@prisma/client';

export class UpdateOrderUseCase {
  constructor(private orderRepository: IOrdersRepository) {}

  async execute(data: Order): Promise<void> {
    const order = await this.orderRepository.update(data);

    if (!order) {
      throw new Error('Order not found');
    }
  }
}
