'use client';
'use client';

import { Loader2 } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { Input } from './Input';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { Order } from '@prisma/client';
import { api } from '@/services/api';
import { useAuth } from '@/context/useAuth';
import action from '@/app/actions';

type EditOrderFormProps = {
  order: Order;
};

export function EditOrderForm({ order }: EditOrderFormProps) {
  const { user } = useAuth();
  const { push } = useRouter();

  const orderRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const { current } = orderRef;

    if (current?.value.trim() === '') {
      return setLoading(false);
    }

    try {
      const { status } = await api.patch<{ order: Order }>(
        `/order/${order.id}`,
        {
          ...order,
          title: current?.value,
        },
        {
          headers: {
            Authorization: user?.id,
          },
        },
      );

      if (status === 200) {
        action();
        push('/orders');
      }
    } catch (error) {
      setError(`Error updating order. Try again later.`);
      setLoading(false);
    }
  }

  return (
    <div className="flex-col gap-8 w-80 py-12 px-8 m-auto shadow-md shadow-slate-600 rounded-lg bg-brand-bg flex items-start justify-center backdrop:blur">
      <h1 className="text-gray-200 font-bold text-2xl gradient-text-light">
        You can edit your order title.
      </h1>

      <form
        className="flex flex-col gap-2 items-start justify-center w-full"
        onSubmit={onSubmit}
        role="form"
      >
        <Input
          ref={orderRef}
          defaultValue={order.title}
          placeholder="Order name"
          type="text"
          name="order"
          id="order"
        />

        {error && (
          <span className="gradient-text-error text-xs font-semibold">
            {error}
          </span>
        )}

        <Button type="submit">
          {loading ? (
            <Loader2
              color="black"
              className="animate-spin"
              data-testid="loading-indicator"
            />
          ) : (
            <span className="gradient-text-dark">Update</span>
          )}
        </Button>
      </form>

      <span className="text-gray-200 text-sm align-self-end">
        <Link
          replace
          href="/orders"
          className="gradient-text-light font-semibold hover:underline"
        >
          Back to orders.
        </Link>
      </span>
    </div>
  );
}
