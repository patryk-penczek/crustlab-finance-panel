import { currencies } from '@/constants/currencies';
import { Currency } from '@/types/currency';
import { User } from '@/types/user';
import Image from 'next/image';

type Props = {
  user: User;
};

export const UserBalance = ({ user }: Props) => {
  return (
    <div className="p-6">
      <h2 className="font-medium pb-1.5">Balance</h2>
      <ul className="space-y-1">
        {currencies.map(({ code, flag, alt }, index) => (
          <li key={index} className="flex items-center">
            <Image src={flag} alt={alt} width={20} height={20} />
            <p className="ml-1 mr-0.75">{user.balance[code as Currency]}</p>
            <span className="text-muted-foreground text-xs mt-0.75">
              {code}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
