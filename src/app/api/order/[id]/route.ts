import { PrismaOrderRepository } from '@/domain/repositories/orders/PrismaOrderRepository';
import { DeleteCustomerOrderUseCase } from '@/domain/useCases/orders/DeleteCustomerOrderUseCase';
import { GetOrderUseCase } from '@/domain/useCases/orders/GetOrderUseCase';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') as string;

  const prismaOrderRepository = new PrismaOrderRepository();
  const getOrderUseCase = new GetOrderUseCase(prismaOrderRepository);
  const deleteCustomerOrderUseCase = new DeleteCustomerOrderUseCase(
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
