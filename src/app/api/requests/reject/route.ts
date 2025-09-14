import { prisma } from "@/shared";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { requestId: number }

    await prisma.request.update({
      where: {
        id: body.requestId,
      },
      data: {
        approved: false,
        awaitsApprove: false,
      }
    })

    return new Response("Ok", {
      status: 200,
      statusText: "Ok",
    })
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", {
      status: 500,
      statusText: "Internal server error",
    })
  }
}