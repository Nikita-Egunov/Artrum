"use server";

import { prisma, Token } from "@/shared";
import * as jwt from "jsonwebtoken";

export default async function getProfile(refreshToken: string | undefined) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("process.env.JWT_SECRET");
    }

    if (!refreshToken) {
      throw new Error("!refreshToken");
    }
    const decoded = jwt.decode(refreshToken) as { userEmail: string; type: "refresh" };

    if (decoded.type !== "refresh") {
      throw new Error("!refresh type");
    }

    if (!decoded.userEmail) {
      throw new Error("!.userId");
    }


    const user = prisma.user.findUnique({
      where: {
        email: decoded.userEmail,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error(error);
  }
}
