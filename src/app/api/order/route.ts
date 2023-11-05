import { PrismaCustomerRepository } from '@/domain/repositories/customers/PrismaCustomerRepository';
import { PrismaOrderRepository } from '@/domain/repositories/orders/PrismaOrderRepository';
import { GetCustomerUseCase } from '@/domain/useCases/customers/GetCustomerUseCase';
import { GetCustomerOrdersUseCase } from '@/domain/useCases/orders/GetCustomerOrdersUseCase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') as string;

  const prismaCustomerRepository = new PrismaCustomerRepository();
  const prismaOrderRepository = new PrismaOrderRepository();

  const getCustomerUseCase = new GetCustomerUseCase(prismaCustomerRepository);
  const getCustomerOrdersUseCase = new GetCustomerOrdersUseCase(
    prismaOrderRepository,
  );

  try {
    const customer = await getCustomerUseCase.execute(email);
    const orders = await getCustomerOrdersUseCase.execute(customer.id);

    if (orders) {
      return NextResponse.json(
        {
          orders,
        },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    const { message } = error as Error;

    return NextResponse.json({ error: message }, { status: 404 });
  }
}
