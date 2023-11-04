import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Home() {
  return (
    <main className="text-brand-default min-h-full flex justify-center font-bold">
      Orders list
    </main>
  );
}
