import { Currency } from '@/types/currency';
import { ExchangeRate } from '@/types/exchange-rate';

export const exchangeRates: ExchangeRate[] = [
  {
    base: Currency.PLN,
    rates: {
      PLN: 1,
      EUR: 0.24,
      USD: 0.25,
    },
  },
  {
    base: Currency.EUR,
    rates: {
      PLN: 4.15,
      EUR: 1,
      USD: 1.04,
    },
  },
  {
    base: Currency.USD,
    rates: {
      PLN: 3.97,
      EUR: 0.96,
      USD: 1,
    },
  },
];
