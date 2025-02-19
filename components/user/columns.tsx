'use client';

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
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <span>
        {row.original.amount}{' '}
        <span className="text-muted-foreground text-xs">
          {row.original.currency}
        </span>
      </span>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorFn: (row) => row.details?.recipientId ?? '-',
    header: 'Recipient ID',
  },
  {
    accessorFn: (row) => row.details?.exchangedTo ?? '-',
    header: 'Exchanged To',
  },
  {
    accessorFn: (row) => row.details?.fee ?? '-',
    header: 'Fee',
  },
];
