import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthForm from '@/app/auth/components/AuthForm';
import Navbar from '@/components/common/Navbar';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>


export default async function AuthPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const isLogin = params?.mode === 'login';
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (token) {
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <AuthForm isLogin={isLogin} />
    </div>
  );
}
