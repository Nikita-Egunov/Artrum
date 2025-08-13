import { jwtVerify } from 'jose';
import { NextResponse, NextRequest } from 'next/server'

const AUTH_ROUTES = ['/profile'];
export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  )

  if (!isAuthRoute) {
    return NextResponse.next()
  }

  try {
    if (!accessToken || !process.env.JWT_SECRET) {
      throw new Error('No token');
    }

    const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET), {
      algorithms: ['HS256'],
    })

    console.log(payload.type);
    

    if (payload.type !== 'access') {
      throw new Error('Invalid token type')
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId as string);

    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    return response
  } catch (error) {
    console.log('Error of 1 catch:', error);

    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${request.nextUrl.origin}/api/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          // Повторяем оригинальный запрос с новым токеном
          return NextResponse.redirect(request.url);
        }
      } catch (error) {
        console.error('Refresh token failed:', error);
      }
    }
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/profile/:path*'],
}
