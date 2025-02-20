'use client';

import { User as UserType } from '@/types/user';
import { useUsersFromStorage } from '../../hooks/get-users-from-storage';
import { DepositDialog } from '../dialogs/deposit-dialog';
import { ExchangeDialog } from '../dialogs/exchange-dialog';
import { SendDialog } from '../dialogs/send-dialog';
import { WithdrawDialog } from '../dialogs/withdraw-dialog';
import { columns } from './columns';
import { DataTable } from './data-table';
import { UserBalance } from './user-balance';
import { UserHeader } from './user-header';

export function User({ user: defaultUser }: { user: UserType }) {
  const { getUserById } = useUsersFromStorage();
  const user = getUserById(defaultUser.id);

  if (!user) {
    return <p>Loading user...</p>;
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="bg-white rounded-md border min-w-72">
        <UserHeader user={user} />
        <UserBalance user={user} />
        <div className="flex flex-col py-6 border-t">
          <SendDialog user={user} />
          <DepositDialog user={user} />
          <WithdrawDialog user={user} />
          <ExchangeDialog user={user} />
        </div>
      </div>
      <div className="w-full">
        <h3 className="mb-3 font-semibold text-xl">Operations</h3>
        <DataTable columns={columns} data={user.operations} />
      </div>
    </div>
  );
}
