'use client';

import action from '@/app/actions';
import { useAuth } from '@/context/useAuth';
import { api } from '@/services/api';
import { Order } from '@prisma/client';
import { Trash } from 'lucide-react';
import Link from 'next/link';

export function OrdersList({ orders }: { orders: Order[] }) {
  const { user } = useAuth();

  async function handleDeleteOrder(orderId: string) {
    try {
      const { status } = await api.delete<{ message: string }>(
        `/order/${orderId}`,
        {
          headers: {
            Authorization: user?.id,
          },
        },
      );

      if (status === 200) action();
    } catch (error: unknown) {}
  }

  return (
    <>
      {orders.map((order) => (
        <tr
          data-testid={`order-${order.title}`}
          key={order.id}
          className="p-4 even:bg-brand-bg"
        >
          <td className="p-4 text-center">
            <Link
              title="View and edit order title"
              href={`/orders/${order.id}`}
            >
              {order.title}
            </Link>
          </td>

          <td className="p-4 text-center hover:opacity-80 transition w-full flex items-end justify-center hover:cursor-pointer">
            <button
              type="button"
              title="Delete order"
              onClick={() => handleDeleteOrder(order.id)}
            >
              <Trash className="text-red-600" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
