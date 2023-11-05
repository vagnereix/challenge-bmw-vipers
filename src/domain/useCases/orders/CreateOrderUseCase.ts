import { IOrdersRepository } from '@/domain/repositories/orders/IOrdersRepository';
import { Order } from '@prisma/client';

type OrderTypeDTO = Pick<Order, 'title' | 'customerId'>;

export class CreateOrderUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute(data: OrderTypeDTO): Promise<Order> {
    const order = await this.ordersRepository.create(data);

    return order;
  }
}
