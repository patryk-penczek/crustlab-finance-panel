import { operationFees } from '@/constants/fees';
import { users } from '@/constants/users';
import { Currency } from '@/types/currency';
import { OperationType } from '@/types/operation';
import { User } from '@/types/user';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSendOperation } from '../use-send-operation';

describe('useSendOperation', () => {
  const senderUser = users[0];
  const recipientUser = users[1];

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
      getItem: vi.fn(() => JSON.stringify([senderUser, recipientUser])),
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

  it('should send money from sender to recipient and update localStorage', () => {
    const { send } = useSendOperation({ user: senderUser });

    const amount = 50;
    const currency: Currency = Currency.USD;
    const fee = Number((amount * operationFees.transfer).toFixed(2));
    const totalAmount = amount + fee;
    const senderInitialBalance = senderUser.balance[currency];
    const recipientInitialBalance = recipientUser.balance[currency];

    send(amount, currency, recipientUser.id.toString());

    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);

    const [key, value] = localStorageMock.setItem.mock.calls[0];
    expect(key).toBe('users');

    const updatedUsers: User[] = JSON.parse(value);
    expect(updatedUsers).toHaveLength(2);

    const updatedSender = updatedUsers.find((u) => u.id === senderUser.id);
    expect(updatedSender).toBeDefined();

    expect(updatedSender!.balance[currency]).toBe(
      senderInitialBalance - totalAmount
    );

    expect(updatedSender!.operations).toHaveLength(1);

    const senderOperation = updatedSender!.operations[0];
    expect(senderOperation).toMatchObject({
      id: 1,
      type: OperationType.TRANSFER,
      amount,
      currency,
      details: {
        fee: { amount: fee, currency },
        senderId: senderUser.id,
        recipientId: recipientUser.id,
      },
    });

    expect(typeof senderOperation.date).toBe('string');

    const updatedRecipient = updatedUsers.find(
      (u) => u.id === recipientUser.id
    );
    expect(updatedRecipient).toBeDefined();
    expect(updatedRecipient!.balance[currency]).toBe(
      recipientInitialBalance + amount
    );
    expect(updatedRecipient!.operations).toHaveLength(1);

    const recipientOperation = updatedRecipient!.operations[0];
    expect(recipientOperation).toMatchObject({
      id: 1,
      type: OperationType.TRANSFER,
      amount,
      currency,
      details: {
        fee: { amount: fee, currency },
        senderId: senderUser.id,
        recipientId: recipientUser.id,
      },
    });
    expect(typeof recipientOperation.date).toBe('string');

    expect(windowMock.dispatchEvent).toHaveBeenCalledWith(
      new Event('usersUpdated')
    );
  });

  it('should throw an error if recipient is not found', () => {
    const { send } = useSendOperation({ user: senderUser });

    const amount = 50;
    const currency: Currency = Currency.USD;
    expect(() => send(amount, currency, '999')).toThrowError(
      'Recipient not found'
    );
  });

  it('should throw an error if sender has insufficient funds', () => {
    const lowFundsSender: User = {
      ...senderUser,
      balance: { ...senderUser.balance, [Currency.USD]: 40 },
      operations: [],
    };

    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: vi.fn(() => JSON.stringify([lowFundsSender, recipientUser])),
        setItem: vi.fn(),
      },
      writable: true,
    });

    const { send } = useSendOperation({ user: lowFundsSender });

    const amount = 50;
    const currency: Currency = Currency.USD;
    const fee = Number((amount * operationFees.transfer).toFixed(2));
    const totalAmount = amount + fee;
    const lowBalance = lowFundsSender.balance[currency];

    expect(() =>
      send(amount, currency, recipientUser.id.toString())
    ).toThrowError(
      `Insufficient funds. Your ${currency} balance is ${lowBalance}. Required amount with fee: ${totalAmount}`
    );
  });
});
