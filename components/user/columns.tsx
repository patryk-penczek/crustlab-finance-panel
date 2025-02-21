'use client';

import { operationFees } from '@/constants/fees';
import { users } from '@/constants/users';
import { getExchangeRate } from '@/hooks/use-exchange-operation';
import { Currency } from '@/types/currency';
import { Operation } from '@/types/operation';
import { ColumnDef } from '@tanstack/react-table';
export const columns: ColumnDef<Operation>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const type = row.original.type;
      return type.charAt(0).toUpperCase() + type.slice(1);
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span>
        {row.original.amount.toFixed(2)}{' '}
        <span className="text-muted-foreground text-xs">
          {row.original.currency}
        </span>
      </span>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.original.date);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: 'recipientId',
    header: 'Recipient',
    cell: ({ row }) => {
      const recipient = row.original.details?.recipientId;
      return recipient
        ? users.find((user) => user.id === recipient)?.firstName +
            ' ' +
            users.find((user) => user.id === recipient)?.lastName
        : '-';
    },
  },
  {
    accessorKey: 'exchangedTo',
    header: 'Exchanged To',
    cell: ({ row }) =>
      row.original.details?.exchangedTo ? (
        <div>
          {(
            getExchangeRate(
              row.original.currency,
              row.original.details?.exchangedTo ?? Currency.PLN
            ) *
            (row.original.amount - row.original.amount * operationFees.exchange)
          ).toFixed(2)}{' '}
          <span className="text-muted-foreground text-xs">
            {row.original.details?.exchangedTo}
          </span>
        </div>
      ) : (
        '-'
      ),
  },
  {
    accessorKey: 'fee',
    header: 'Fee',
    cell: ({ row }) => (
      <span>
        {row.original.details.fee.amount.toFixed(2)}{' '}
        <span className="text-muted-foreground text-xs">
          {row.original.details.fee.currency}
        </span>
      </span>
    ),
  },
];
