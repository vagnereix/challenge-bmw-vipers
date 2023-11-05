import { PrismaCustomerRepository } from '@/domain/repositories/customers/PrismaCustomerRepository';
import { GetCustomerOrdersUseCase } from '@/domain/useCases/customers/GetCustomerOrdersUseCase';
import { GetCustomerUseCase } from '@/domain/useCases/customers/GetCustomerUseCase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') as string;

  const prismaCustomerRepository = new PrismaCustomerRepository();
  const getCustomerUseCase = new GetCustomerUseCase(prismaCustomerRepository);
  const getCustomerOrdersUseCase = new GetCustomerOrdersUseCase(
    prismaCustomerRepository,
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
