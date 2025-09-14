import { prisma } from "@/shared";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { requestId: number }

    // Находим запрос и связанный с ним Aft
    const req = await prisma.request.findUnique({
      where: {
        id: body.requestId
      },
      include: {
        aft: true
      }
    })

    if (!req) {
      return new Response("Request not found", {
        status: 404,
        statusText: "Not Found",
      })
    }

    // Обновляем владельца Aft и статус запроса в транзакции
    const result = await prisma.$transaction([
      // Обновляем владельца Aft
      prisma.aft.update({
        where: {
          id: req.aftId
        },
        data: {
          masterId: req.fromId
        }
      }),

      // Обновляем статус запроса
      prisma.request.update({
        where: {
          id: body.requestId
        },
        data: {
          approved: true,
          awaitsApprove: false
        }
      })
    ])

    return new Response("OK", {
      status: 200,
      statusText: "OK",
    })
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", {
      status: 500,
      statusText: "Internal server error",
    })
  }
}