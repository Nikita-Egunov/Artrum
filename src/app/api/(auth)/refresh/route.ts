import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken || !process.env.JWT_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET,
      ) as {
        userId: number
        token: string;
      };

      if (decoded.token !== "refresh") {
        return new Response("Unauthorized", {
          status: 401,
          statusText: "Unauthorized",
        })
      }

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        }
      })

      if (!user) {
        return new Response("Unauthorized", {
          status: 401,
          statusText: "Unauthorized",
        })
      }

      const newAccessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: '15m'
        }
      )

      const newRefreshToken = jwt.sign(
        { userId: user.id, tokenType: 'refresh' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );


      cookieStore.set({
        name: 'refreshToken',
        value: newRefreshToken,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/api/refresh',
        secure: true,
        sameSite: 'strict'
      })

      cookieStore.set({
        name: "token",
        value: newAccessToken,
        httpOnly: true,
        maxAge: 60 * 15,
        sameSite: "lax",
        secure: true,
        path: "/",
      })
    } catch (error) {
      return new Response("Unauthorized", {
        status: 401,
        statusText: "Unauthorized",
      })
    }
  } catch (error) {
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    })
  }
}