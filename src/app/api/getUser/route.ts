import { isVerified } from "@/utils";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value
  const refreshToken = cookieStore.get("refreshToken")?.value

  if (!refreshToken) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  if (!token) {

  }

  try {
    isVerified(token)
  } catch (error) {
    console.error("Error in GET route:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
