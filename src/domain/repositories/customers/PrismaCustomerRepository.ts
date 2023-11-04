import { prisma } from '@/services/prisma';
import { Customer } from '@prisma/client';
import { ICustomersRepository } from './ICustomersRepository';

export class PrismaCustomerRepository implements ICustomersRepository {
  async create(data: Customer) {
    return await prisma.customer.create({
      data,
    });
  }

  async getCustomerByEmail(email: string) {
    return await prisma.customer.findUnique({
      where: {
        email,
      },
    });
  }

  async getCustomerOrders(id: string) {
    return await prisma.order.findMany({
      where: {
        customerId: id,
      },
    });
  }
}
