import { Currency } from './currency';

export enum OperationType {
  TRANSFER = 'transfer',
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  EXCHANGE = 'exchange',
}

export type Operation = {
  id: number;
  type: OperationType;
  amount: number;
  currency: Currency;
  date: string;
  details: {
    senderId?: number;
    recipientId?: number;
    exchangedFrom?: Currency;
    exchangedTo?: Currency;
    fee?: number;
  };
};
