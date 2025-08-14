// sign-in
import { prisma } from "@/shared";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  try {
    const formData = await req.json();
    const { email, password } = formData;

    if (!email || !password) {
      return new Response("Error", {
        status: 400,
        statusText: "Bad Request",
      });
    }

    if (email.length === 0 || password.length === 0) {
      return new Response("Error", {
        status: 400,
        statusText: "Bad Request",
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    const isPasswordValid = user ? user.password === password : false;

    if (!user || !isPasswordValid) {
      return new Response("Error", {
        status: 404,
        statusText: "Not Found",
      });
    }

    if (user.password !== password) {
      return new Response("Error", {
        status: 404,
        statusText: "Not Found",
      });
    }

    if (!process.env.JWT_SECRET) {
      return new Response("Server error", { status: 500 });
    }

    const token = jwt.sign(
      { userEmail: user.email, type: "access" },
      process.env.JWT_SECRET,
      { algorithm: "HS256" },
    );

    const refreshToken = jwt.sign(
      { userEmail: user.email, type: "refresh" },
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
      },
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: true,
      path: "/",
    });

    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    return Response.json({
      token,
    });
  } catch (error) {
    console.log(error);

    return new Response("Error", {
      status: 400,
      statusText: "Bad Request",
    });
  }
}
