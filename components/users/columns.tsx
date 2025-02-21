'use client';

import { User } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { ActionsCell } from '../actions';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'balance.PLN',
    header: 'PLN',
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <span>
        {row.original.balance.PLN.toFixed(2)}{' '}
        <span className="text-muted-foreground text-xs">PLN</span>
      </span>
    ),
  },
  {
    accessorKey: 'balance.EUR',
    header: 'EUR',
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <span>
        {row.original.balance.EUR.toFixed(2)}{' '}
        <span className="text-muted-foreground text-xs">EUR</span>
      </span>
    ),
  },
  {
    accessorKey: 'balance.USD',
    header: 'USD',
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <span>
        {row.original.balance.USD.toFixed(2)}{' '}
        <span className="text-muted-foreground text-xs">USD</span>
      </span>
    ),
  },
  {
    accessorKey: 'actions',
    header: () => <div className="text-right">Actions</div>,
    enableHiding: false,
    enableGlobalFilter: false,
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
