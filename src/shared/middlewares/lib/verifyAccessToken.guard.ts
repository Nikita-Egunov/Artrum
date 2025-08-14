import { jwtVerify } from "jose";
import { NextResponse, NextRequest } from "next/server";

const AUTH_ROUTES = process.env.AUTH_ROUTES?.split(";") || [];

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
    return { response: NextResponse.next(), userId: null };
  }

  try {
    // 1. Проверка access token
    if (!accessToken || !process.env.JWT_SECRET) {
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
      console.log('refreshToken');
      
      try {
        // Создаем новый запрос с текущими куками
        const refreshRequest = new NextRequest(
          `${req.nextUrl.origin}/api/refresh`,
          {
            method: "POST",
            headers: {
              Cookie: req.headers.get("Cookie") || "",
              "Content-Type": "application/json",
            },
          },
        );

        const refreshResponse = await fetch(refreshRequest);
        

        if (refreshResponse.ok) {
          console.log('resp ok');
          
          // Создаем ответ и копируем куки из refreshResponse
          const response = NextResponse.next();

          // Копируем все куки из refresh ответа
          refreshResponse.headers.forEach((value, key) => {
            if (key.toLowerCase() === "set-cookie") {
              response.headers.append("Set-Cookie", value);
            }
          });

          return { response, userId: null };
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
      }
    }

    // Перенаправление на страницу входа
    const loginUrl = new URL("/sign-in", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return { response: NextResponse.redirect(loginUrl), userId: null };
  }
}
