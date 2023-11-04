import { prisma } from '@/services/prisma';
import { getCustomer } from '@/utils';
import { Customer } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email') as string;

  const customer = await getCustomer(email);

  if (customer) {
    return NextResponse.json(
      {
        customer,
      },
      { status: 200 },
    );
  }

  return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}

export async function POST(request: NextRequest) {
  const body: Customer = await request.json();
  const hasCustomer = await getCustomer(body.email);

  if (hasCustomer) {
    return NextResponse.json(
      { error: 'Customer already exists' },
      { status: 400 },
    );
  }

  try {
    const customer = await prisma.customer.create({
      data: {
        ...body,
      },
    });

    if (customer) {
      return NextResponse.json(
        {
          customer,
        },
        { status: 201 },
      );
    }
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'Error on register new customer' },
      { status: 400 },
    );
  }
}
