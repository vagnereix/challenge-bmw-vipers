import { prisma } from '@/services/prisma';

export async function getCustomerOrders(id: string) {
  return await prisma.order.findMany({
    where: {
      customerId: id,
    },
  });
}

export async function getCustomer(email: string) {
  return await prisma.customer.findUnique({
    where: {
      email,
    },
  });
}
