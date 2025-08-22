import { refreshAccess, RefreshToken } from "@/utils";
import { jwtVerify } from "jose";
import { NextResponse, NextRequest } from "next/server";

const AUTH_ROUTES = process.env.AUTH_ROUTES?.split(";") || [];
const ADMIN_ROUTES = process.env.ADMIN_ROUTES?.split(";") || [];

export async function verifyAccessToken(req: NextRequest) {
  if (!AUTH_ROUTES.length) {
    throw new Error("process.env.AUTH_ROUTES not configured");
  }

  const accessToken = req.cookies.get("token")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );


  if (!isAuthRoute) {
    return { response: NextResponse.next(), userEmail: null };
  }

  const isAdminRoute = ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  try {
    if (!refreshToken || !process.env.JWT_SECRET) {
      throw new Error("process.env.JWT_SECRET or process.env.REFRESH_SECRET not configured");
    }

    const refreshTokenObject = await jwtVerify(
      refreshToken,
      new TextEncoder().encode(process.env.JWT_SECRET),
      { algorithms: ["HS256"] },
    )

    if (
      !refreshTokenObject.payload.userEmail ||
      refreshTokenObject.payload.type !== "refresh"
    ) {
      throw new Error("Invalid refresh token");
    }

    if (isAdminRoute) {
      console.log('amin route');

      const userEmail = refreshTokenObject.payload.userEmail;

      if (userEmail !== process.env.ADMIN_EMAIL) {
        const loginUrl = new URL("/profile", req.url);
        loginUrl.searchParams.set("redirect", pathname);
        return { response: NextResponse.redirect(loginUrl), userEmail: null };
      }
    }

    // 1. Проверка access token
    if (!accessToken) {
      throw new Error("No token");
    }

    const { payload } = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET),
      { algorithms: ["HS256"] },
    );

    if (payload.type !== "access") {
      throw new Error("Invalid token type");
    }

    if (!payload.userId) {
      throw new Error("UserId missing in token");
    }

    // 2. Успешная проверка - добавляем userId в headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", payload.userId as string);

    return {
      response: NextResponse.next({ request: { headers: requestHeaders } }),
      userId: payload.userId as string,
    };
  } catch (error) {
    console.error("Access token verification failed:", error);

    // 3. Попытка обновить токен
    if (refreshToken) {
      console.log('try to refresh token');

      const refreshAccessResponse = await refreshAccess(req);
      if (refreshAccessResponse) {
        return refreshAccessResponse
      }
    }

    // Перенаправление на страницу входа
    const loginUrl = new URL("/sign-in", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return { response: NextResponse.redirect(loginUrl), userEmail: null };
  }
}
