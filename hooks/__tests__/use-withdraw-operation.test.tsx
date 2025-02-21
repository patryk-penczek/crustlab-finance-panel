import { operationFees } from '@/constants/fees';
import { users } from '@/constants/users';
import { Currency } from '@/types/currency';
import { OperationType } from '@/types/operation';
import { User } from '@/types/user';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useWithdrawOperation } from '../use-withdraw-operation';

describe('useWithdrawOperation', () => {
  const user = users[0];

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

  it('should withdraw money and update localStorage when funds are sufficient', () => {
    const { withdraw } = useWithdrawOperation({ user: user });

    const amount = 50;
    const currency: Currency = Currency.USD;
    const fee = Number((amount * operationFees.withdraw).toFixed(2));
    const totalAmount = amount + fee;
    const currentBalance = user.balance[currency];
    const expectedBalance = currentBalance - totalAmount;

    withdraw(amount, currency);

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);

    const [key, value] = localStorageMock.setItem.mock.calls[0];
    expect(key).toBe('users');

    const updatedUsers: User[] = JSON.parse(value);
    expect(updatedUsers).toHaveLength(1);

    const updatedUser = updatedUsers[0];
    expect(updatedUser.balance[currency]).toBe(expectedBalance);
    expect(updatedUser.operations).toHaveLength(1);

    const newOperation = updatedUser.operations[0];
    expect(newOperation).toMatchObject({
      id: 1,
      type: OperationType.WITHDRAW,
      amount,
      currency,
      details: { fee: { amount: fee, currency } },
    });
    expect(typeof newOperation.date).toBe('string');

    expect(windowMock.dispatchEvent).toHaveBeenCalledWith(
      new Event('usersUpdated')
    );
  });

  it('should throw an error when funds are insufficient', () => {
    const poorUser: User = {
      ...user,
      balance: { ...user.balance, [Currency.USD]: 30 },
      operations: [],
    };

    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: vi.fn(() => JSON.stringify([poorUser])),
        setItem: vi.fn(),
      },
      writable: true,
    });

    const { withdraw } = useWithdrawOperation({ user: poorUser });
    const amount = 50;
    const currency: Currency = Currency.USD;
    const fee = Number((amount * operationFees.withdraw).toFixed(2));
    const totalAmount = amount + fee;
    const currentBalance = poorUser.balance[currency];

    expect(() => withdraw(amount, currency)).toThrowError(
      `Insufficient funds. Your ${currency} balance is ${currentBalance}. Required amount with fee: ${totalAmount}`
    );
  });
});
