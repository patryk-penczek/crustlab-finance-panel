'use client';

import { cn } from '@/lib/utils';
import { HomeIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from './container';
import { Button } from './ui/button';

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 w-screen z-10 bg-white drop-shadow-sm">
      <Container className="flex justify-between items-center py-1.5">
        <div className="flex items-center">
          <Link
            href="/"
            className={cn(
              'flex items-center',
              pathname === '/' && 'bg-accent rounded-md'
            )}
          >
            <Button variant="ghost">
              <HomeIcon />
              <p>Home</p>
            </Button>
          </Link>
          <Link
            href="/users"
            className={cn(
              'flex items-center',
              pathname === '/users' && 'bg-accent rounded-md'
            )}
          >
            <Button variant="ghost">
              <UsersIcon />
              <p>Users</p>
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          <Image
            src="https://github.com/patryk-penczek.png"
            alt="Patryk Penczek"
            width={36}
            height={36}
            className="rounded-full bg-muted border"
          />
          <div className="flex flex-col sr-only xs:not-sr-only">
            <p className="font-medium text-sm">Patryk Penczek</p>
            <p className="text-muted-foreground text-xs">Administrator</p>
          </div>
        </div>
      </Container>
    </nav>
  );
};
