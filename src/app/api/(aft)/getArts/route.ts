import { prisma } from "@/shared";

export async function GET() {
  try {
    const afts = await prisma.aft.findMany({
      where: {
        masterId: null,
      },
    });

    if (!afts) {
      return new Response("No afts found", {
        status: 404,
        statusText: "No afts found",
      });
    }

    const randomAft = Math.floor(Math.random() * afts.length);

    const endIndex = randomAft + 10;

    if (endIndex <= afts.length) {
      const dataToSend = afts.slice(randomAft, endIndex);
      return new Response(
        JSON.stringify({
          data: dataToSend.map(
            ({ description, id, imageUrl, title }) => ({
              description,
              id,
              imageUrl,
              title,
            }),
          ),
        }),
      );
    } else {
      const firstPart = afts.slice(randomAft);
      const remaining = 10 - firstPart.length;
      const secondPart = afts.slice(0, remaining);
      const dataToSend = firstPart.concat(secondPart);

      return new Response(
        JSON.stringify({
          data: dataToSend.map(
            ({  description, id, imageUrl, title }) => ({
              description,
              id,
              imageUrl,
              title,
            }),
          ),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
          statusText: "OK",
        },
      );
    }
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
