import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex justify-center items-center h-[calc(100dvh-160px)] ">
      <section className="flex flex-col bg-white border rounded-md p-4 md:p-8">
        <hgroup>
          <h1 className="text-lg md:text-3xl font-semibold">
            Interview task for{' '}
            <Link
              href="https://crustlab.com"
              target="_blank"
              className="duration-200 hover:text-blue-700"
            >
              CrustLab
            </Link>
          </h1>
          <p className="text-sm md:text-base max-w-2xl text-muted-foreground mt-1.5 mb-3">
            An admin panel application for managing user accounts and financial
            transactions. Browse the user list, perform user financial
            operations, and track operations history. Easily deposit, withdraw,
            transfer funds and exchange currencies!
          </p>
        </hgroup>
        <Link
          href="/users"
          className="flex items-center gap-x-2 duration-200 hover:text-blue-700 mr-auto"
        >
          <span className="font-medium">Users</span>
          <ArrowRightIcon className="size-4" />
        </Link>
      </section>
    </main>
  );
}
