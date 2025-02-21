import { Container } from '@/components/container';
import { NavBar } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CrustLab Finance Panel',
  description:
    'Admin panel for managing user accounts and financial transactions, built with Next.js and TypeScript.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'bg-accent')}>
        <NavBar />
        <Container className="my-20">{children}</Container>
        <Toaster />
      </body>
    </html>
  );
}
