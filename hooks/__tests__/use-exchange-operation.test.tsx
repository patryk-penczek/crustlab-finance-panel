import { operationFees } from '@/constants/fees';
import { users } from '@/constants/users';
import { Currency } from '@/types/currency';
import { OperationType } from '@/types/operation';
import { User } from '@/types/user';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getExchangeRate,
  useExchangeOperation,
} from '../use-exchange-operation';

describe('getExchangeRate', () => {
  it('should return the correct exchange rate for valid currency pair', () => {
    const rate = getExchangeRate(Currency.USD, Currency.EUR);
    expect(rate).toBe(0.96);
  });

  it('should throw an error if exchange rate info is not found', () => {
    expect(() => getExchangeRate('GBP' as Currency, Currency.USD)).toThrowError(
      `Exchange rate not found for GBP`
    );
  });
});

describe('useExchangeOperation', () => {
  const user = users[1];

  let localStorageMock: {
    getItem: ReturnType<typeof vi.fn>;
    setItem: ReturnType<typeof vi.fn>;
  };

  let windowMock: {
    dispatchEvent: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    localStorageMock = {
      getItem: vi.fn(() => JSON.stringify([user])),
      setItem: vi.fn(),
    };

    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    windowMock = {
      dispatchEvent: vi.fn(),
    };

    Object.defineProperty(global, 'window', {
      value: windowMock,
      writable: true,
    });
  });

  it('should exchange currency and update localStorage when funds are sufficient', () => {
    const { exchange } = useExchangeOperation({ user: user });

    const amount = 100;
    const fromCurrency = Currency.USD;
    const toCurrency = Currency.EUR;

    const fee = Number((amount * operationFees.exchange).toFixed(2));
    const amountAfterFee = amount - fee;
    const exchangeRate = getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amountAfterFee * exchangeRate;

    const initialFromBalance = user.balance[fromCurrency];
    const initialToBalance = user.balance[toCurrency] || 0;

    exchange(amount, fromCurrency, toCurrency);

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);

    const [key, value] = localStorageMock.setItem.mock.calls[0];
    expect(key).toBe('users');

    const updatedUsers: User[] = JSON.parse(value);
    expect(updatedUsers).toHaveLength(1);

    const updatedUser = updatedUsers.find((u) => u.id === user.id);
    expect(updatedUser).toBeDefined();

    expect(updatedUser!.balance[fromCurrency]).toBe(
      initialFromBalance - amount
    );
    expect(updatedUser!.balance[toCurrency]).toBe(
      initialToBalance + convertedAmount
    );

    expect(updatedUser!.operations).toHaveLength(1);

    const newOperation = updatedUser!.operations[0];
    expect(newOperation).toMatchObject({
      id: 1,
      type: OperationType.EXCHANGE,
      amount,
      currency: fromCurrency,
      details: {
        fee: { amount: fee, currency: fromCurrency },
        exchangedFrom: fromCurrency,
        exchangedTo: toCurrency,
      },
    });

    expect(typeof newOperation.date).toBe('string');

    expect(windowMock.dispatchEvent).toHaveBeenCalledWith(
      new Event('usersUpdated')
    );
  });

  it('should throw an error when insufficient funds', () => {
    const lowFundsUser: User = {
      ...user,
      balance: { ...user.balance, [Currency.USD]: 50 },
      operations: [],
    };

    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: vi.fn(() => JSON.stringify([lowFundsUser])),
        setItem: vi.fn(),
      },
      writable: true,
    });

    const { exchange } = useExchangeOperation({ user: lowFundsUser });

    const amount = 100;
    const fromCurrency = Currency.USD;
    const toCurrency = Currency.EUR;
    expect(() => exchange(amount, fromCurrency, toCurrency)).toThrowError(
      `Insufficient funds. Your ${fromCurrency} balance is ${lowFundsUser.balance[fromCurrency]}.`
    );
  });
});
