'use client';

import { users as initialUsers } from '@/constants/users';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

export const useUsersFromStorage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = localStorage?.getItem('users');
    if (!storedUsers) {
      localStorage?.setItem('users', JSON.stringify(initialUsers));
      setUsers(initialUsers);
    } else {
      setUsers(JSON.parse(storedUsers));
    }

    const handleUpdate = () => {
      const updatedUsers = localStorage?.getItem('users');
      if (updatedUsers) {
        setUsers(JSON.parse(updatedUsers));
      }
    };

    window.addEventListener('usersUpdated', handleUpdate);
    return () => window.removeEventListener('usersUpdated', handleUpdate);
  }, []);

  const getUserById = (userId: number): User => {
    return users.find((user: User) => user.id === userId) as User;
  };

  return { getUsersFromStorage: () => users, getUserById };
};
