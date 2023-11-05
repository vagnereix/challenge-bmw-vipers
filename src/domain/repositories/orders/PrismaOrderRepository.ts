import { prisma } from '@/services/prisma';
import { Order } from '@prisma/client';
import { IOrdersRepository } from './IOrdersRepository';

type OrderTypeDTO = Pick<Order, 'title' | 'customerId'>;

export class PrismaOrderRepository implements IOrdersRepository {
  async create(data: OrderTypeDTO): Promise<Order> {
    return await prisma.order.create({
      data,
    });
  }

  async getOrderById(id: string): Promise<Order | null> {
    return await prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  async update(data: Order): Promise<Order> {
    return await prisma.order.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.order.delete({
      where: {
        id,
      },
    });
  }

  async getCustomerOrders(customerId: string) {
    return await prisma.order.findMany({
      where: {
        customerId,
      },
    });
  }
}
