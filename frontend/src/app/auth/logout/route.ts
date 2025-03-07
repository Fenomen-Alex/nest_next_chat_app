import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = request.cookies;
  const token = cookieStore.get('token');
  if (token) {
    return NextResponse.json({}, {
      status: 302,
      headers: {
        'Set-Cookie': [
          `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`,
          `refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`,
          `user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly`,
        ].join(', '),
        Location: '/auth?mode=login',
      },
    });
  }
  return NextResponse.json({ message: 'You are not logged in' }, { status: 401 });
}
