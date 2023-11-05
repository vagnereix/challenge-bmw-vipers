import { OrdersList } from '@/components/OrdersList';
import { api } from '@/services/api';
import { Order } from '@prisma/client';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

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
        <h1 className="flex gap-4 items-center justify-center text-white font-bold text-4xl text-center gradient-text-light">
          All your orders
        </h1>

        <table className="my-6 text-gray-400 w-full max-w-[1120px] max-h-[120px] rounded-md">
          <thead>
            <tr className="p-4 bg-brand-bg text-lg">
              <th className="p-2 hover:opacity-80 transition">Order title</th>

              <th className="p-2 hover:opacity-80 transition"></th>
            </tr>
          </thead>

          <tbody className="max-h-[200px] overflow-auto">
            <OrdersList orders={data.orders} />
          </tbody>
        </table>
      </div>
    </main>
  );
}
