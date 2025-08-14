import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import { prisma } from "@/shared";

export async function POST(req: Request) {
  try {
    // 1. Получаем куки из заголовков
    const cookieHeader = req.headers.get("Cookie") || "";
    const refreshToken = getCookieValue(cookieHeader, "refreshToken");

    if (!refreshToken || !process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Верификация токена
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET) as {
      userEmail: string;
      type: string;
    };

    if (decoded.type !== "refresh") {
      console.log("decoded.type !== 'refresh'");

      return NextResponse.json(
        { error: "Invalid token type" },
        { status: 401 },
      );
    }

    // 3. Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { email: decoded.userEmail },
    });

    if (!user) {
      console.log("!user");

      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // 4. Генерация новых токенов
    const newAccessToken = generateToken(user.email, "access", "15m");
    const newRefreshToken = generateToken(user.email, "refresh", "7d");

    // 5. Создаем ответ с куками
    const response = NextResponse.json({ status: "OK" }, { status: 200 });

    // 6. Устанавливаем куки в ответ
    response.cookies.set({
      name: "refreshToken",
      value: newRefreshToken,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    response.cookies.set({
      name: "token",
      value: newAccessToken,
      httpOnly: true,
      maxAge: 60 * 15,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    console.log("OK");

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Вспомогательные функции
function getCookieValue(cookieHeader: string, name: string) {
  const match = cookieHeader.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function generateToken(email: string, type: string, expiresIn: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ userEmail: email, type }, process.env.JWT_SECRET, {
    expiresIn,
    algorithm: "HS256",
  } as jwt.SignOptions);
}
