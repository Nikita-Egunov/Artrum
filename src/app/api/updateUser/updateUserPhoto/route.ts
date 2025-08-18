// app/api/updateUser/updateUserPhoto/route.ts
import { del, put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma, Token } from '@/shared';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value

  console.log(token);


  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const decoded = jwt.decode(token) as Token

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      }
    })

    if (user?.avatarUrl) {
      await del(user.avatarUrl)
    }

    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    if (!blob) {
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: decoded.userId,
      },
      data: {
        avatarUrl: blob.url,
      },
    })

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }

    return new Response("", {
      status: 200,
      statusText: 'OK',
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}