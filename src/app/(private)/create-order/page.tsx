import { CreateOrderForm } from '@/components/CreateOrderForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create order',
};

export default function CreateOrderPage() {
  return (
    <main className="h-screen grid place-items-center">
      <CreateOrderForm />
    </main>
  );
}
