import { IOrdersRepository } from '@/domain/repositories/orders/IOrdersRepository';
import { Order } from '@prisma/client';

type OrderTypeDTO = Pick<Order, 'title' | 'customerId'>;

export class UpdateOrderUseCase {
  constructor(private orderRepository: IOrdersRepository) {}

  async execute(data: OrderTypeDTO): Promise<void> {
    const order = await this.orderRepository.update(data);

    if (!order) {
      throw new Error('Order not found');
    }
  }
}
