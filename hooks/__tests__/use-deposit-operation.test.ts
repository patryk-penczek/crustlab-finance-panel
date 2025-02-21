import { operationFees } from '@/constants/fees';
import { users } from '@/constants/users';
import { Currency } from '@/types/currency';
import { OperationType } from '@/types/operation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDepositOperation } from '../use-deposit-operation';

describe('useDepositOperation', () => {
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

  it('should deposit money and update localStorage', () => {
    const { deposit } = useDepositOperation({ user: user });

    const amount = 50;
    const currency: Currency = Currency.USD;
    const fee = Number((amount * operationFees.deposit).toFixed(2));
    const amountAfterFee = amount - fee;

    deposit(amount, currency);

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);

    const callArgs = localStorageMock.setItem.mock.calls[0];
    expect(callArgs[0]).toBe('users');

    const updatedUsers = JSON.parse(callArgs[1]);
    expect(updatedUsers).toHaveLength(1);

    const updatedUser = updatedUsers[0];
    expect(updatedUser.balance[currency]).toBe(
      user.balance[currency] + amountAfterFee
    );

    expect(updatedUser.operations).toHaveLength(1);

    const newOperation = updatedUser.operations[0];
    expect(newOperation).toMatchObject({
      id: 1,
      type: OperationType.DEPOSIT,
      amount,
      currency,
      details: { fee: { amount: fee, currency } },
    });

    expect(typeof newOperation.date).toBe('string');

    expect(windowMock.dispatchEvent).toHaveBeenCalledWith(
      new Event('usersUpdated')
    );
  });
});
