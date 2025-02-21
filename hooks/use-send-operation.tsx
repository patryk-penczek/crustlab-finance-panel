'use client';

import { operationFees } from '@/constants/fees';
import { Currency } from '@/types/currency';
import { Operation, OperationType } from '@/types/operation';
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

    const fee = Number((amount * operationFees.transfer).toFixed(2));
    const totalAmount = amount + fee;

    const senderBalance = sender.balance[currency] || 0;
    if (senderBalance < totalAmount) {
      throw new Error(
        `Insufficient funds. Your ${currency} balance is ${senderBalance}. Required amount with fee: ${totalAmount}`
      );
    }

    const baseOperation = {
      type: OperationType.TRANSFER,
      amount,
      currency,
      date: new Date().toISOString(),
      details: {
        fee: {
          amount: fee,
          currency: currency,
        },
        senderId: sender.id,
        recipientId: parseInt(recipientId),
      },
    };

    const senderOperation: Operation = {
      ...baseOperation,
      id: sender.operations.length + 1,
    };

    const recipientOperation: Operation = {
      ...baseOperation,
      id: recipient.operations.length + 1,
    };

    const updatedUsers = currentUsers.map((currentUser: User) => {
      if (currentUser.id === sender.id) {
        return {
          ...currentUser,
          balance: {
            ...currentUser.balance,
            [currency]: senderBalance - totalAmount,
          },
          operations: [...currentUser.operations, senderOperation],
        };
      }
      if (currentUser.id === recipient.id) {
        return {
          ...currentUser,
          balance: {
            ...currentUser.balance,
            [currency]: (currentUser.balance[currency] || 0) + amount,
          },
          operations: [...currentUser.operations, recipientOperation],
        };
      }
      return currentUser;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('usersUpdated'));
  };

  return { send };
};
