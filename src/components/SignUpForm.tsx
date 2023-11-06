'use client';

import { Loader2 } from 'lucide-react';
import { AxiosError } from 'axios';
import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { Input } from './Input';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Customer } from '@prisma/client';

export function SignUpForm() {
  const { push } = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    if (
      nameRef?.current?.value.trim() === '' ||
      emailRef?.current?.value.trim() === ''
    ) {
      return setLoading(false);
    }

    try {
      const { status } = await api.post<{ customer: Customer }>('/customer', {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
      });

      if (status === 201) push('/sign-in');
    } catch (error: unknown) {
      const { response } = error as AxiosError<{ error: string }>;

      setLoading(false);
      setError(response?.data.error as string);
    }
  }

  return (
    <div className="flex-col gap-8 w-80 py-12 px-8 m-auto shadow-md shadow-slate-600 rounded-lg bg-brand-bg flex items-start justify-center">
      <h1 className="text-gray-200 font-bold text-2xl gradient-text-light">
        Please, fill some information&apos;s.
      </h1>

      <form
        className="flex flex-col gap-2 items-start justify-center w-full"
        onSubmit={onSubmit}
        role="form"
      >
        <Input
          ref={nameRef}
          placeholder="Type your name"
          type="text"
          name="name"
          id="name"
        />

        <Input
          ref={emailRef}
          placeholder="Type your email"
          type="email"
          name="email"
          id="email"
        />

        {error && (
          <span className="gradient-text-error font-semibold text-xs">
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
            <span className="gradient-text-dark">Register</span>
          )}
        </Button>
      </form>

      <span className="text-gray-200 text-sm align-self-end">
        Already have an account?{' '}
        <Link
          replace
          href="/sign-in"
          className="gradient-text-light font-semibold hover:underline"
        >
          Sign in.
        </Link>
      </span>
    </div>
  );
}
