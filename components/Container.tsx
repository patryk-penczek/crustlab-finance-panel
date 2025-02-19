import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'w-full px-4 md:px-16 xl:px-24 max-w-400 mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};
