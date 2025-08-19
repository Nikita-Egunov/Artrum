import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/shared/config/db'
import { refreshAccess, Token } from '@/utils'
import * as jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    const refreshToken = req.cookies.get('refreshToken')?.value

    if (!refreshToken || !process.env.JWT_SECRET) {
      console.error('!refreshToken || !process.env.JWT_SECRET');
      return new Response('Authorization', { status: 401 }) 
    }

    if (!token) {
      try {
        await refreshAccess(req)
      } catch (error) {
        console.error('!refreshAccess');
        
        return new Response('Authorization', { status: 401 })
      }
    }

    if (!token) { return new Response('Authorization', { status: 401 }) }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Token

    if (decoded.type !== 'access') {
      console.error('!decoded.type !== "access"');
      
      return new Response('Authorization', { status: 401 })
    }

    if (!decoded.userId) {
      console.error('!decoded.userEmail');
      
      return NextResponse.json({ error: 'Authorization' }, { status: 401 })
    }

    const { nik, email, password } = await req.json() as {
      nik: string | undefined
      email: string
      password: string | undefined
    }

    if (!email) {
      console.error('!email');
      
      return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      }
    })

    if (!user) {
      console.error('decoded.userEmail', decoded.userId);
      
      console.error('!user');
      
      return new Response('Authorization', {
        status: 401
      })
    }

    const updateData: {
      name: string
      email: string
      password: string
    } = {
      name: nik || '',
      email,
      password: password || user.password,
    }

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return new Response("Ok", {
      status: 200,
    })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении данных' },
      { status: 500 }
    )
  }
}
