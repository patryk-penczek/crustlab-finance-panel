import { Balances, Currency } from './currency';

export type ExchangeRate = {
  base: Currency;
  rates: Balances;
};
