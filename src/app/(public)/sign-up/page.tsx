import { SignUpForm } from '@/components/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
};

export default function SignUp() {
  return (
    <main className="h-screen grid place-items-center">
      <SignUpForm />
    </main>
  );
}
