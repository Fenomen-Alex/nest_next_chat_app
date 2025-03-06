import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/dal/auth';

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();
  const { token, user } = await register(name, email, password);

  return NextResponse.json(
    { message: 'Registration successful', user },
    {
      status: 201,
      headers: {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly`,
      },
    }
  );
}
