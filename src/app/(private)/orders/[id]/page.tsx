import { EditOrderForm } from '@/components/EditOrderForm';
import { api } from '@/services/api';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit order',
};

type EditOrderPageProps = {
  params: {
    id: string;
  };
};

export default async function EditOrderPage({ params }: EditOrderPageProps) {
  const { data } = await api.get(`/order/${params.id}`);

  return (
    <main className="h-screen grid place-items-center">
      <EditOrderForm order={data.order} />
    </main>
  );
}
