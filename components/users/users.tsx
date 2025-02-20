'use client';

import { useUsersFromStorage } from '../../hooks/get-users-from-storage';
import { columns } from './columns';
import { DataTable } from './data-table';

export const Users = () => {
  const { getUsersFromStorage } = useUsersFromStorage();
  const users = getUsersFromStorage();

  if (!users.length) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h1 className="mb-3 font-semibold text-xl">Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
};
