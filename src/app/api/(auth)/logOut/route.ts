import { prisma, Token } from "@/shared";
import { cookies } from "next/headers";

import * as jwt from "jsonwebtoken";

export async function GET() {
  try {
    const coocieStore = await cookies();
    const token = coocieStore.get("token")?.value;
    const refreshToken = coocieStore.get("refreshToken")?.value;

    if (!token || !refreshToken || !process.env.JWT_SECRET) {
      return new Response("Unauthorized", {
        status: 401,
        statusText: "Unauthorized",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token;

    await prisma.user.update({
      where: {
        id: decoded.userId,
      },
      data: {
        refreshToken: '',
      }
    })

    coocieStore.delete("token");
    coocieStore.delete("refreshToken");

    return new Response("OK", {
      status: 200,
      statusText: "OK",
    })
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", {
      status: 500,
      statusText: "Internal Server Error",
    })
  }
}