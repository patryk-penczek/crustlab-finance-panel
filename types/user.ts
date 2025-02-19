import { Balances } from './currency';
import { Operation } from './operation';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  balance: Balances;
  operations: Operation[];
};
