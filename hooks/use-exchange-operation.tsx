'use client';

import { exchangeRates } from '@/constants/exchange-rates';
import { Currency } from '@/types/currency';
import { User } from '@/types/user';

export const useExchangeOperation = ({ user }: { user: User }) => {
  const getExchangeRate = (fromCurrency: Currency, toCurrency: Currency) => {
    const rateInfo = exchangeRates.find((rate) => rate.base === fromCurrency);
    if (!rateInfo) {
      throw new Error(`Exchange rate not found for ${fromCurrency}`);
    }
    return rateInfo.rates[toCurrency];
  };

  const exchange = (
    amount: number,
    fromCurrency: Currency,
    toCurrency: Currency
  ) => {
    const fromBalance = user.balance[fromCurrency] || 0;
    if (fromBalance < amount) {
      throw new Error(
        `Insufficient funds. Your ${fromCurrency} balance is ${fromBalance}.`
      );
    }

    const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amount * exchangeRate;

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
        };
      }
      return currentUser;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    window.dispatchEvent(new Event('usersUpdated'));
  };

  return { exchange };
};
