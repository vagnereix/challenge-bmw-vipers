import { SignInForm } from '@/components/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default function Home() {
  return (
    <main className="h-screen grid place-items-center">
      <SignInForm />
    </main>
  );
}
