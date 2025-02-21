'use client';

import { useUsersFromStorage } from '../../hooks/get-users-from-storage';
import { columns } from './columns';
import { DataTable } from './data-table';
import { UsersSkeleton } from './users-skeleton';

export const Users = () => {
  const { getUsersFromStorage } = useUsersFromStorage();
  const users = getUsersFromStorage();

  if (!users.length) {
    return <UsersSkeleton />;
  }

  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-xl">Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
};
