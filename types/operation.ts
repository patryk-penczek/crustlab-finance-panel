import { Currency } from './currency';

export enum OperationType {
  TRANSFER = 'transfer',
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  EXCHANGE = 'exchange',
}

export type OperationDetails = {
  senderId?: number;
  recipientId?: number;
  exchangedFrom?: Currency;
  exchangedTo?: Currency;
  fee: {
    amount: number;
    currency: Currency;
  };
  totalAmount?: number;
  amountAfterFee?: number;
  convertedAmount?: number;
};

export type Operation = {
  id: number;
  type: OperationType;
  amount: number;
  currency: Currency;
  date: string;
  details: OperationDetails;
};
