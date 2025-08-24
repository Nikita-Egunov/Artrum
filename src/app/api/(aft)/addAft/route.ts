import { prisma } from "@/shared"
import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const cost = (formData.get('price') || 0).toString()
    const description = formData.get('description') as string
    const title = formData.get('title') as string
    const image = formData.get('image') as File

    console.log(cost);
    

    const blob = await put(image.name, image, {
      access: 'public',
      addRandomSuffix: true,
    })

    if (!blob) {
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }


    await prisma.aft.create({
      data: {
        cost,
        description,
        title,
        imageUrl: blob.url,
      }
    })

    return new Response("OK", {
      status: 200,
      statusText: "OK",
    })
  } catch (error) {
    console.error(error)
    return new Response("Internal Server Error", {
      status: 500,
      statusText: "Internal Server Error",
    })
  }
}
