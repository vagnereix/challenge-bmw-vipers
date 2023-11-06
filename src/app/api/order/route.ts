import { PrismaCustomerRepository } from '@/domain/repositories/customers/PrismaCustomerRepository';
import { PrismaOrderRepository } from '@/domain/repositories/orders/PrismaOrderRepository';
import { GetCustomerUseCase } from '@/domain/useCases/customers/GetCustomerUseCase';
import { CreateOrderUseCase } from '@/domain/useCases/orders/CreateOrderUseCase';
import { GetCustomerOrdersUseCase } from '@/domain/useCases/orders/GetCustomerOrdersUseCase';
import { Order } from '@prisma/client';
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

export async function POST(request: NextRequest) {
  const body: Order = await request.json();

  const { headers } = request;
  const userId = headers.get('authorization');

  const prismaOrderRepository = new PrismaOrderRepository();
  const createOrderUseCase = new CreateOrderUseCase(prismaOrderRepository);

  const orderDTO = {
    ...body,
    customerId: userId as string,
  };

  try {
    const order = await createOrderUseCase.execute(orderDTO);

    if (order) {
      return NextResponse.json(
        {
          order,
        },
        { status: 201 },
      );
    }
  } catch (error: unknown) {
    const { message } = error as Error;

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
