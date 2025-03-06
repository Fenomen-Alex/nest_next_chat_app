import { cookies } from 'next/headers';

export const getUser = async () => {
  const cookieStore = await cookies();
  const userJson = cookieStore.get('user');
  return userJson ? JSON.parse(userJson?.value) : null;
}


