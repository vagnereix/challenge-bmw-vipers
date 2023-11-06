import { OrdersList } from '@/components/OrdersList';
import { api } from '@/services/api';
import { Order } from '@prisma/client';
import { PlusCircle } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Orders() {
  const email = cookies().get('@bmw.customer.email')?.value;

  const { data } = await api.get<{ orders: Order[] }>('/order', {
    params: {
      email: JSON.parse(email as string),
    },
  });

  return (
    <main className="min-h-[100vh] overflow-auto w-screen flex items-center justify-center gap-8 p-4">
      <div className="max-w-[1120px] w-full">
        {data.orders.length > 0 ? (
          <>
            <h1 className="flex gap-3 items-center justify-center text-white font-bold text-2xl text-center gradient-text-light">
              All your orders{' '}
              <Link href="/create-order" title="Create new order">
                <PlusCircle
                  size={24}
                  className="text-blue-300 hover:brightness-125 transition-all"
                />
              </Link>
            </h1>

            <table className="my-6 text-gray-400 w-full max-w-[1120px] max-h-[120px] rounded-md">
              <thead>
                <tr className="p-4 bg-brand-bg text-lg">
                  <th className="p-2 hover:opacity-80 transition">
                    Order title
                  </th>

                  <th className="p-2 hover:opacity-80 transition" />
                </tr>
              </thead>

              <tbody className="max-h-[200px] overflow-auto">
                <OrdersList orders={data.orders} />
              </tbody>
            </table>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="gradient-text-light font-bold text-2xl text-center">
              You don&apos;t have any orders yet
            </h2>

            <p className="text-gray-200 text-center">
              Go to the{' '}
              <Link
                href="/create-order"
                className="gradient-text-light font-medium hover:opacity-80 transition-all"
              >
                products page
              </Link>{' '}
              and add some to your cart
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
