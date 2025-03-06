import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/dal/auth';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const { token, user } = await login(email, password);

  const userString = JSON.stringify(user);

  return NextResponse.json(
    { message: 'Login successful', user },
    {
      status: 200,
      headers: {
        'Set-Cookie': [
          `token=${token}; Path=/; HttpOnly`,
          `user=${encodeURIComponent(userString)}; Path=/; HttpOnly`,
        ].join(', '),
      },
    }
  );
}
