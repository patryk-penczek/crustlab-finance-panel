import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <div className="w-full px-4 md:px-16 xl:px-24 max-w-400 mx-auto">
      {children}
    </div>
  );
};
