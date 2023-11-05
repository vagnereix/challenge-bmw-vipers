import { Metadata } from 'next';
import '../styles/globals.scss';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/useAuth';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: `BMW Vipers`,
    template: `%s | BMW`,
  },
  description: `Next.js challenge for BMW Vipers`,
  icons: {
    icon: 'bmw.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
