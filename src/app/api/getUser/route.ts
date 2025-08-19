import { prisma, Token } from "@/shared";
import { isVerified, refreshAccess } from "@/utils";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { User } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value
    const refreshToken = cookieStore.get("refreshToken")?.value

    if (!refreshToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (await isVerified(token)) {
      const user = await getUser(token)
      if (!user) { return new Response("User not found", { status: 404 }); }
      return sendUser(user)
    } else {

      const refreshResponse = await refreshAccess(req)

      if (refreshResponse) {
        const newToken = cookieStore.get("token")?.value;

        const user = await getUser(newToken);
        if (!user) { return new Response("User not found", { status: 404 }); }
        return sendUser(user)
      } else {
        return new Response("Unauthorized", {
          status: 401,
          statusText: "Unauthorized",
        })
      }
    }


  } catch (error) {
    console.error("Error in GET route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

const getUser = async (token: string | undefined) => {
  if (!token) { throw new Error("Missing token"); }

  const decodedToken = jwt.decode(token) as Token;

  return await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    }
  })
}

const sendUser = async (user: User) => {
  return new Response(JSON.stringify({
    data: {
      name: user?.name,
      email: user?.email,
    }
  }), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
    statusText: "OK",
  })
}
