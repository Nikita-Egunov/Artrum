// sign-up

import { Data } from "@/utils";
import { PrismaClient, User } from "@prisma/client";
import * as jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

const prisma = new PrismaClient()
export async function POST(req: Request) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const cookieStore = await cookies()
  try {
    const formData: Data = await req.json()

    if (!formData.email || !formData.password) {
      return new Response("Error", {
        status: 400,
        statusText: "Bad Request",
      })
    }

    if (!emailRegex.test(formData.email)) {
      return new Response("Error", {
        status: 400,
        statusText: "Bad Request",
      })
    }

    if (formData.password.length < 8) {
      return new Response("Error", {
        status: 400,
        statusText: "Bad Request",
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: formData.email,
      }
    })
    if (user) {
      return new Response("Error", {
        status: 409,
        statusText: "Conflict",
      })
    }
    if (formData.email.length === 0 || formData.password.length === 0) {
      return new Response("Error", {
        status: 400,
        statusText: "Bad Request",
      })
    }

    if (!process.env.JWT_SECRET) { return new Response("Server error", { status: 500 }); }

    const token = jwt.sign(
      { userId: formData.email, type: 'access' },
      process.env.JWT_SECRET,
      { algorithm: 'HS256' },
    )

    cookieStore.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 15 * 60,
      sameSite: 'lax',
      secure: true,
      path: '/',
    })

    const refreshToken = jwt.sign(
      { userId: formData.email, type: 'refresh' },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24 * 7
      }
    )

    const newUser: User = await prisma.user.create({
      data: {
        email: formData.email,
        password: formData.password,
        refreshToken: refreshToken
      }
    })

    cookieStore.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/api/refresh',
      secure: true,
      sameSite: 'strict'
    })

    return new Response("OK", {
      status: 200,
    })
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    })
  }
}