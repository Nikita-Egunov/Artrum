// lib/middleware/auth.ts
import { jwtVerify } from 'jose';
import { NextResponse, NextRequest } from 'next/server';

const AUTH_ROUTES = process.env.AUTH_ROUTES?.split(';')

export async function verifyAccessToken(req: NextRequest) {
  if (!AUTH_ROUTES) {
    throw new Error("process.env.AUTH_ROUTES exist");
  }
  const accessToken = req.cookies.get('token')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const { pathname } = req.nextUrl;

  const isAuthRoute = AUTH_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  );

  if (!isAuthRoute) {
    return { response: NextResponse.next(), userId: null };
  }

  try {
    if (!accessToken || !process.env.JWT_SECRET) {
      throw new Error('No token');
    }

    const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET), {
      algorithms: ['HS256'],
    });

    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', payload.userId as string);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    return { response, userId: payload.userId as string };
  } catch (error) {
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${req.nextUrl.origin}/api/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          return { response: NextResponse.redirect(req.url), userId: null };
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
      }
    }

    const loginUrl = new URL('/sign-in', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return { response: NextResponse.redirect(loginUrl), userId: null };
  }
}