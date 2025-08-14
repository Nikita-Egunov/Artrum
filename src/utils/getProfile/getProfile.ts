import { Token } from '@/shared';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient()
export default async function getProfile(token: string | undefined) {
  try {
    if (!token || !process.env.JWT_SECRET) {
      throw new Error("Token is missing")
    }
    const isValid = jwt.verify(token, process.env.JWT_SECRET)

    if (!isValid) {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      } catch (error) {
        throw new Error("User is not logged in");
      }
    }
    const decoded = jwt.decode(token) as Token

    if (decoded.type !== 'access') {
      throw new Error("!access type");
    }

    

    if (!decoded.userEmail) {
      throw new Error("!userEmail");
    }

    const user = prisma.user.findUnique({
      where: {
        email: decoded.userEmail
      },
    })

    if (!user) {
      throw new Error("User not found");
    }

    return user
  } catch (error) {
  }
}