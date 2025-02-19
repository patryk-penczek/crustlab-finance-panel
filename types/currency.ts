export enum Currency {
  PLN = 'PLN',
  EUR = 'EUR',
  USD = 'USD',
}

export type Balances = Record<Currency, number>;
