import { users } from '@/constants/users';
import { DataTable } from '../ui/data-table';
import { columns } from './columns';

export const Users = () => {
  return (
    <div className="my-16">
      <DataTable columns={columns} data={users} />
    </div>
  );
};
