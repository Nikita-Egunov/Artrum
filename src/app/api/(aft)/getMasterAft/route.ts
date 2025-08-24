import { prisma, Token } from "@/shared";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

export async function GET(req: Request) {
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

    if (decoded.type !== "access") {
      return new Response("Unauthorized", {
        status: 401,
        statusText: "Unauthorized",
      })
    }

    if (!decoded.userId) {
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

    const arts = await prisma.aft.findMany({
      where: {
        masterId: user.id
      }
    })

    if (arts.length > 0) {
      return new Response(JSON.stringify({
        data: arts.map(({ cost, description, id, imageUrl }) => ({
          cost,
          description,
          id,
          imageUrl,
        }))
      }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
        statusText: "OK",
      })
    }

    if (arts.length === 0) {
      return new Response(JSON.stringify({
        data: []
      }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
        statusText: "OK",
      })
    }

  } catch (error) {
    console.error(error);
  }
}