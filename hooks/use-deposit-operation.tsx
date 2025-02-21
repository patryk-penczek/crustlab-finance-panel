'use client';

import { operationFees } from '@/constants/fees';
import { Currency } from '@/types/currency';
import { Operation, OperationType } from '@/types/operation';
import { User } from '@/types/user';

export const useDepositOperation = ({ user }: { user: User }) => {
  const deposit = (amount: number, currency: Currency) => {
    const storedUsers = localStorage.getItem('users');
    const currentUsers = storedUsers ? JSON.parse(storedUsers) : [];

    const fee = Number((amount * operationFees.deposit).toFixed(2));
    const amountAfterFee = amount - fee;

    const newOperation: Operation = {
      id: user.operations.length + 1,
      type: OperationType.DEPOSIT,
      amount,
      currency,
      date: new Date().toISOString(),
      details: {
        fee: {
          amount: fee,
          currency: currency,
        },
      },
    };

    const updatedUsers = currentUsers.map((currentUser: User) => {
      if (currentUser.id === user.id) {
        return {
          ...currentUser,
          balance: {
            ...currentUser.balance,
            [currency]: (currentUser.balance[currency] || 0) + amountAfterFee,
          },
          operations: [...currentUser.operations, newOperation],
        };
      }
      return currentUser;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('usersUpdated'));
  };

  return { deposit };
};
