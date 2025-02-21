import { users } from '@/constants/users';
import { describe, expect, it } from 'vitest';
import { getUserById } from '../getUserById';

describe('getUserById', () => {
  it('should return the user with the given ID', async () => {
    const user = users[0];
    const result = await getUserById(user.id);

    expect(result).toEqual(user);
  });

  it('should return undefined if user is not found', async () => {
    const result = await getUserById(77);
    expect(result).toBeUndefined();
  });
});
