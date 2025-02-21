'use client';

import { operationFees } from '@/constants/fees';
import { Currency } from '@/types/currency';
import { Operation, OperationType } from '@/types/operation';
import { User } from '@/types/user';

export const useWithdrawOperation = ({ user }: { user: User }) => {
  const withdraw = (amount: number, currency: Currency) => {
    const fee = Number((amount * operationFees.withdraw).toFixed(2));
    const totalAmount = amount + fee;

    const currentBalance = user.balance[currency] || 0;
    if (currentBalance < totalAmount) {
      throw new Error(
        `Insufficient funds. Your ${currency} balance is ${currentBalance}. Required amount with fee: ${totalAmount}`
      );
    }

    const storedUsers = localStorage.getItem('users');
    const currentUsers = storedUsers ? JSON.parse(storedUsers) : [];

    const newOperation: Operation = {
      id: user.operations.length + 1,
      type: OperationType.WITHDRAW,
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
            [currency]: currentBalance - totalAmount,
          },
          operations: [...currentUser.operations, newOperation],
        };
      }
      return currentUser;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('usersUpdated'));
  };

  return { withdraw };
};
