import { NextRequest, NextResponse } from "next/server";

export default async function refreshAccess(req: NextRequest) {
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