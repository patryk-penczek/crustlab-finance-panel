'use client';

import { Currency } from '@/types/currency';
import { User } from '@/types/user';

export const useWithdrawOperation = ({ user }: { user: User }) => {
  const withdraw = (amount: number, currency: Currency) => {
    const currentBalance = user.balance[currency] || 0;
    if (currentBalance < amount) {
      throw new Error(
        `Insufficient funds. Your ${currency} balance is ${currentBalance}.`
      );
    }

    const storedUsers = localStorage.getItem('users');
    const currentUsers = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUsers = currentUsers.map((currentUser: User) => {
      if (currentUser.id === user.id) {
        return {
          ...currentUser,
          balance: {
            ...currentUser.balance,
            [currency]: currentBalance - amount,
          },
        };
      }
      return currentUser;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('usersUpdated'));
  };

  return { withdraw };
};
