import { Currency } from '@/types/currency';
import { OperationType } from '@/types/operation';
import { User } from '@/types/user';

export const users: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    balance: { PLN: 5000, EUR: 1000, USD: 800 },
    operations: [
      {
        id: 1,
        type: OperationType.TRANSFER,
        amount: 500,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          senderId: 1,
          recipientId: 2,
        },
      },
      {
        id: 2,
        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 3,
        type: OperationType.WITHDRAW,
        amount: 500,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 4,
        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedFrom: Currency.PLN,
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 2,
    firstName: 'Alice',
    lastName: 'Smith',
    balance: { PLN: 7500, EUR: 500, USD: 200 },
    operations: [
      {
        id: 1,
        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,
        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Johnson',
    balance: { PLN: 2000, EUR: 300, USD: 100 },
    operations: [
      {
        id: 1,
        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,
        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Davis',
    balance: { PLN: 10000, EUR: 1200, USD: 600 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 5,
    firstName: 'Robert',
    lastName: 'Wilson',
    balance: { PLN: 3000, EUR: 800, USD: 400 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 6,
    firstName: 'Sophia',
    lastName: 'Brown',
    balance: { PLN: 6500, EUR: 900, USD: 500 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 7,
    firstName: 'William',
    lastName: 'Jones',
    balance: { PLN: 4500, EUR: 700, USD: 300 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 8,
    firstName: 'Olivia',
    lastName: 'Miller',
    balance: { PLN: 500, EUR: 100, USD: 50 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 9,
    firstName: 'James',
    lastName: 'Anderson',
    balance: { PLN: 1500, EUR: 200, USD: 100 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 10,
    firstName: 'Charlotte',
    lastName: 'Taylor',
    balance: { PLN: 8000, EUR: 1100, USD: 700 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 11,
    firstName: 'Benjamin',
    lastName: 'Thomas',
    balance: { PLN: 4000, EUR: 600, USD: 250 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 12,
    firstName: 'Amelia',
    lastName: 'Harris',
    balance: { PLN: 7200, EUR: 950, USD: 500 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 13,
    firstName: 'Henry',
    lastName: 'Clark',
    balance: { PLN: 1000, EUR: 150, USD: 80 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 14,
    firstName: 'Evelyn',
    lastName: 'Lewis',
    balance: { PLN: 3200, EUR: 400, USD: 200 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 15,
    firstName: 'Alexander',
    lastName: 'Walker',
    balance: { PLN: 5500, EUR: 850, USD: 450 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 16,
    firstName: 'Mia',
    lastName: 'Allen',
    balance: { PLN: 9200, EUR: 1300, USD: 650 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 17,
    firstName: 'Daniel',
    lastName: 'Young',
    balance: { PLN: 2800, EUR: 500, USD: 300 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 18,
    firstName: 'Harper',
    lastName: 'King',
    balance: { PLN: 6000, EUR: 1000, USD: 550 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 19,
    firstName: 'Matthew',
    lastName: 'Wright',
    balance: { PLN: 4300, EUR: 700, USD: 350 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
  {
    id: 20,
    firstName: 'Ava',
    lastName: 'Scott',
    balance: { PLN: 7700, EUR: 1150, USD: 620 },
    operations: [
      {
        id: 1,

        type: OperationType.DEPOSIT,
        amount: 5000,
        currency: Currency.PLN,
        date: '2025-02-18T16:00:00Z',
        details: {
          fee: 0.02,
        },
      },
      {
        id: 2,

        type: OperationType.EXCHANGE,
        amount: 2000,
        currency: Currency.PLN,
        date: '2025-02-17T17:00:00Z',
        details: {
          exchangedTo: Currency.USD,
          fee: 0.005,
        },
      },
    ],
  },
];
