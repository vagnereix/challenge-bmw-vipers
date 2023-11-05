'use client';

import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { Input } from './Input';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { Customer } from '@prisma/client';
import { setCookie } from 'cookies-next';

export function SignInForm() {
  const { push } = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const { current } = emailRef;

    if (current?.value.trim() === '') {
      return setLoading(false);
    }

    try {
      const { data } = await axios.get<{ customer: Customer }>(
        '/api/customer',
        {
          params: {
            email: current?.value,
          },
        },
      );

      setCookie('@bmw.customer.email', JSON.stringify(data.customer.email), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) /** 7 days */,
      });

      push(`/orders`);
    } catch (error) {
      setError(`User not found`);
      setLoading(false);
    }
  }

  return (
    <div className="flex-col gap-8 w-80 py-12 px-8 m-auto shadow-md shadow-slate-600 rounded-lg bg-brand-bg flex items-start justify-center backdrop:blur">
      <h1 className="text-gray-200 font-bold text-2xl gradient-text-light">
        Welcome back, please sign in.
      </h1>

      <form
        className="flex flex-col gap-2 items-start justify-center w-full"
        onSubmit={onSubmit}
        role="form"
      >
        <Input
          ref={emailRef}
          placeholder="Type your email"
          type="email"
          name="email"
          id="email"
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
            <span className="gradient-text-dark">Sign in</span>
          )}
        </Button>
      </form>

      <span className="text-gray-200 text-sm align-self-end">
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="gradient-text-light font-semibold hover:underline"
        >
          Sign up.
        </Link>
      </span>
    </div>
  );
}
