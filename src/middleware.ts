// middleware.ts
import { NextRequest } from "next/server";
import { verifyAccessToken } from "./shared/middlewares";

export async function middleware(request: NextRequest) {
  const { response } = await verifyAccessToken(request);

  return response;
}

export const config = {
  matcher: ["/:path*"],
};
