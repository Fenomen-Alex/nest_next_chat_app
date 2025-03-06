import { cookies } from 'next/headers';
import { User } from '@/types/user';

export const getUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const userJson = cookieStore.get('user');
  return userJson ? JSON.parse(userJson?.value) : null;
}


