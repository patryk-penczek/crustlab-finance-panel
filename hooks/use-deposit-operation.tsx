'use client';

import { Currency } from '@/types/currency';
import { User } from '@/types/user';

export const useDepositOperation = ({ user }: { user: User }) => {
  const deposit = (amount: number, currency: Currency) => {
    const storedUsers = localStorage.getItem('users');
    const currentUsers = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUsers = currentUsers.map((currentUser: User) => {
      if (currentUser.id === user.id) {
        return {
          ...currentUser,
          balance: {
            ...currentUser.balance,
            [currency]: (currentUser.balance[currency] || 0) + amount,
          },
        };
      }
      return currentUser;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('usersUpdated'));
  };

  return { deposit };
};
