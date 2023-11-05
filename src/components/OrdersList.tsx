'use client';

import { useAuth } from '@/context/useAuth';
import { api } from '@/services/api';
import { Order } from '@prisma/client';
import { Trash } from 'lucide-react';
import Link from 'next/link';

type OrdersListProps = { orders: Order[] };

export function OrdersList({ orders }: OrdersListProps) {
  const { user } = useAuth();

  function handleDeleteOrder(orderId: string) {
    api.delete(`/order/${orderId}`, {
      headers: {
        Authorization: user?.id,
      },
    });
  }

  return (
    <>
      {orders.map((order) => (
        <tr key={order.id} className="p-4 even:bg-brand-bg">
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
