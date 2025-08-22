import { prisma, Token } from "@/shared";
import { isVerified, refreshAccess } from "@/utils";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { User } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return new Response("Unauthorized", {
        status: 401,
        statusText: "Unauthorized",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      }
    })

    return new Response(JSON.stringify({
      avatarUrl: user?.avatarUrl,
      email: user?.email,
      name: user?.name,
      moneyWasted: user?.moneyWasted,
    }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    })
  } catch (error) {
    console.error(error)

    return new Response("Internal Error 500", {
      status: 500,
      statusText: "Internal Server Error",
    })
  }
}
