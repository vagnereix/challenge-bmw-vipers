import { PrismaOrderRepository } from '@/domain/repositories/orders/PrismaOrderRepository';
import { DeleteOrderUseCase } from '@/domain/useCases/orders/DeleteOrderUseCase';
import { GetOrderUseCase } from '@/domain/useCases/orders/GetOrderUseCase';
import { UpdateOrderUseCase } from '@/domain/useCases/orders/UpdateOrderUseCase';
import { Order } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const prismaOrderRepository = new PrismaOrderRepository();
  const getOrderUseCase = new GetOrderUseCase(prismaOrderRepository);

  try {
    const order = await getOrderUseCase.execute(id);

    return NextResponse.json(
      {
        order,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const { message } = error as Error;

    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { headers } = request;
  const userId = headers.get('authorization');

  const prismaOrderRepository = new PrismaOrderRepository();
  const getOrderUseCase = new GetOrderUseCase(prismaOrderRepository);
  const deleteCustomerOrderUseCase = new DeleteOrderUseCase(
    prismaOrderRepository,
  );

  try {
    const order = await getOrderUseCase.execute(id);

    if (userId !== order.customerId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await deleteCustomerOrderUseCase.execute(id);

    return NextResponse.json(
      {
        message: `Order ${order.id} deleted successfully`,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const { message } = error as Error;

    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function PATCH(request: NextRequest) {
  const { headers } = request;
  const userId = headers.get('authorization');
  const body: Order = await request.json();

  const prismaOrderRepository = new PrismaOrderRepository();
  const updateOrderUseCase = new UpdateOrderUseCase(prismaOrderRepository);

  try {
    if (userId !== body.customerId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedOrder = await updateOrderUseCase.execute(body);

    return NextResponse.json(
      {
        order: updatedOrder,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const { message } = error as Error;

    return NextResponse.json({ error: message }, { status: 404 });
  }
}
