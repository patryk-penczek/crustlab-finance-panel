'use client';

import { exchangeRates } from '@/constants/exchange-rates';
import { operationFees } from '@/constants/fees';
import { Currency } from '@/types/currency';
import { Operation, OperationType } from '@/types/operation';
import { User } from '@/types/user';

export const getExchangeRate = (
  fromCurrency: Currency,
  toCurrency: Currency
) => {
  const rateInfo = exchangeRates.find((rate) => rate.base === fromCurrency);
  if (!rateInfo) {
    throw new Error(`Exchange rate not found for ${fromCurrency}`);
  }
  return rateInfo.rates[toCurrency];
};

export const useExchangeOperation = ({ user }: { user: User }) => {
  const exchange = (
    amount: number,
    fromCurrency: Currency,
    toCurrency: Currency
  ) => {
    const fee = Number((amount * operationFees.exchange).toFixed(2));
    const amountAfterFee = amount - fee;

    const fromBalance = user.balance[fromCurrency] || 0;
    if (fromBalance < amount) {
      throw new Error(
        `Insufficient funds. Your ${fromCurrency} balance is ${fromBalance}.`
      );
    }

    const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amountAfterFee * exchangeRate;

    const newOperation: Operation = {
      id: user.operations.length + 1,
      type: OperationType.EXCHANGE,
      amount,
      currency: fromCurrency,
      date: new Date().toISOString(),
      details: {
        fee: {
          amount: fee,
          currency: fromCurrency,
        },
        exchangedFrom: fromCurrency,
        exchangedTo: toCurrency,
      },
    };

    const storedUsers = localStorage.getItem('users');
    const currentUsers = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUsers = currentUsers.map((currentUser: User) => {
      if (currentUser.id === user.id) {
        return {
          ...currentUser,
          balance: {
            ...currentUser.balance,
            [fromCurrency]: fromBalance - amount,
            [toCurrency]:
              (currentUser.balance[toCurrency] || 0) + convertedAmount,
          },
          operations: [...currentUser.operations, newOperation],
        };
      }
      return currentUser;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('usersUpdated'));
  };

  return { exchange };
};
