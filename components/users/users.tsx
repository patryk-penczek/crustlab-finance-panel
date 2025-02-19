import { users } from '@/constants/users';
import { columns } from './columns';
import { DataTable } from './data-table';

export const Users = () => {
  return (
    <div>
      <h1 className="mb-3 font-semibold text-xl">Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
};
