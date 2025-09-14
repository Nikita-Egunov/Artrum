import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { prisma, Token } from "@/shared";
export async function POST(req: Request) {
  try {
    const coockieStore = await cookies();
    const token = coockieStore.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return new Response("Unauthorized", {
        status: 401,
        statusText: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token

    const data = await req.json() as { id: string };


    try {
      const aft = await prisma.aft.findUnique({
        where: {
          id: parseInt(data.id),
        }
      })
      if (!aft) {
        throw new Error("aft not found");
      }

      if (aft.masterId !== null) {
        throw new Error("master id is not null");
      }

      await prisma.request.create({
        data: {
          aftId: parseInt(data.id),
          fromId: decoded.userId,
        }
      })
    } catch (error) {
      console.error(error);
      
      return new Response("Bad request", {
        status: 400,
        statusText: "Bad request",
      })
    }

    return new Response("200", {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
