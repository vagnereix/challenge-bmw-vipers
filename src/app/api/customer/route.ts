import { PrismaCustomerRepository } from '@/domain/repositories/customers/PrismaCustomerRepository';
import { CreateCustomerUseCase } from '@/domain/useCases/customers/CreateCustomerUseCase';
import { GetCustomerUseCase } from '@/domain/useCases/customers/GetCustomerUseCase';
import { Customer } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') as string;

  const prismaCustomerRepository = new PrismaCustomerRepository();
  const getCustomerUseCase = new GetCustomerUseCase(prismaCustomerRepository);

  try {
    const customer = await getCustomerUseCase.execute(email);

    if (customer) {
      return NextResponse.json(
        {
          customer,
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
  const body: Customer = await request.json();

  const prismaCustomerRepository = new PrismaCustomerRepository();
  const getCustomerUseCase = new GetCustomerUseCase(prismaCustomerRepository);
  const createCustomerUseCase = new CreateCustomerUseCase(
    prismaCustomerRepository,
  );

  try {
    const hasCustomer = await getCustomerUseCase.execute(body.email);

    if (hasCustomer) {
      return NextResponse.json(
        { error: 'Customer already exists' },
        { status: 400 },
      );
    }

    const customer = await createCustomerUseCase.execute(body);

    if (customer) {
      return NextResponse.json(
        {
          customer,
        },
        { status: 201 },
      );
    }
  } catch (error: unknown) {
    const { message } = error as Error;

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
