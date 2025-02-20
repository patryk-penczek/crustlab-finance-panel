'use client';

import { Currency } from '@/types/currency';
import { User } from '@/types/user';

export const useSendOperation = ({ user }: { user: User }) => {
  const send = (amount: number, currency: Currency, recipientId: string) => {
    const storedUsers = localStorage.getItem('users');
    const currentUsers = storedUsers ? JSON.parse(storedUsers) : [];

    const sender = user;
    const recipient = currentUsers.find(
      (currentUser: User) => currentUser.id.toString() === recipientId
    );

    if (!recipient) {
      throw new Error('Recipient not found');
    }

    const senderBalance = sender.balance[currency] || 0;
    if (senderBalance < amount) {
      throw new Error(
        `Insufficient funds. Your ${currency} balance is ${senderBalance}.`
      );
    }

    const updatedUsers = currentUsers.map((currentUser: User) => {
      if (currentUser.id === sender.id) {
        return {
          ...currentUser,
          balance: {
            ...currentUser.balance,
            [currency]: senderBalance - amount,
          },
        };
      }
      if (currentUser.id === recipient.id) {
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

  return { send };
};
