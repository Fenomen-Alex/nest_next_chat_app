import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthForm from '@/app/auth/components/AuthForm';

// @ts-ignore
export default async function AuthPage({ searchParams }) {
  const params = await searchParams;
  const isLogin = await params?.mode === 'login';
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
