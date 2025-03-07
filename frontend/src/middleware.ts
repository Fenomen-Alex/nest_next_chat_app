import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { refreshToken as refresh } from '@/lib/dal/auth';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = '/auth';
  url.search = 'mode=login';
  const accessToken = req.cookies.get('token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(url);
  }
  try {
    if (accessToken != null) {
      const decodedToken = jwt.decode(accessToken);
      if (decodedToken && typeof decodedToken === 'object') {
        const exp = decodedToken.exp as number;
        const now = Math.floor(Date.now() / 1000);
        if (exp < now) {
          if (refreshToken) {
            const { access_token } = await refresh(refreshToken);


            if (access_token) {
              const response = NextResponse.next();
              response.cookies.set('token', access_token, { httpOnly: true, path: '/' });
              return response;
            }
          }
          return NextResponse.redirect(url);
        }
      }
    }
  } catch (error: Error | any) {
    console.error(error)
    if (error.message === 'invalid signature' || error.message === 'Invalid refresh token') {
      req.cookies.delete('token');
      req.cookies.delete('refresh_token');
      req.cookies.delete('user');
      return NextResponse.redirect(url);
    }

    if (refreshToken) {
      const response = await refresh(refreshToken);

      const { access_token } = response;
      if (access_token) {
        const response = NextResponse.next();
        response.cookies.set('token', access_token, { httpOnly: true, path: '/' });
        return response;
      }
    }
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|auth).*)'],
};
