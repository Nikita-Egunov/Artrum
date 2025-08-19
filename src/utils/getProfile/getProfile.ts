"use server";

import { prisma } from "@/shared";
import * as jwt from "jsonwebtoken";
import { RefreshToken } from "../types/token.interface";
import { logger } from "@/shared/lib";
import { User } from "@prisma/client";

export default async function getProfile(refreshToken: string | undefined) {
  try {
    if (!process.env.JWT_SECRET || !refreshToken) {
      throw new Error("process.env.JWT_SECRET || !refreshToken");
    }

    const decoded = jwt.decode(refreshToken) as RefreshToken

    if (decoded.type !== "refresh"|| !decoded.userEmail) {
      throw new Error('decoded.type !== "refresh"|| !decoded.userEmail');
    }

    const user = await prisma.user.findUnique({
      where: {
        email: decoded.userEmail,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user as User
  } catch (error) {
    logger.error(error)
  }
}
