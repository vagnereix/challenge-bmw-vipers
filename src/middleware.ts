import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const user = cookies().get('@bmw.customer.email');

  if (pathname === '/') {
    if (user) {
      return NextResponse.redirect(new URL('/orders', request.url));
    }

    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (pathname.includes('sign-in') || pathname.includes('sign-up')) {
    if (user) {
      return NextResponse.redirect(new URL('/orders', request.url));
    }

    return NextResponse.next();
  }

  if (pathname.includes('order')) {
    if (user) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.redirect(new URL('/orders', request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/',
    '/orders',
    '/create-order',
    '/orders/:id*',
    '/sign-in',
    '/sign-up',
  ],
};
