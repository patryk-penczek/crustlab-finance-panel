import { users } from '@/constants/users';

export const getUserById = async (id: number) => {
  return users.find((user) => user.id === id);
};
