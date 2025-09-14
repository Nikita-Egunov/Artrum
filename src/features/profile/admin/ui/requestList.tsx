"use server"
import React from 'react'
import { prisma } from '@/shared';
import AftRequest from '../lib/ui/aftRequst';

export default async function RequestList() {
  // Получаем все запросы вместе с связанными данными
  const requests = await prisma.request.findMany({
    include: {
      from: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          email: true,
        }
      },
      aft: {
        select: {
          id: true,
          title: true,
          description: true,
          imageUrl: true
        }
      }
    },
    orderBy: {
      id: 'desc'
    },
    where: {
      awaitsApprove: true // Только ожидающие подтверждения
    }
  });

  if (requests.length === 0) {
    return (
      <div className='p-6 bg-primary-800/40 rounded-xl border border-primary-700'>
        <h2 className='text-2xl font-bold text-primary-50'>
          Список запросов AFT
        </h2>
        <p className='mt-4 text-primary-200'>Запросы не найдены</p>
      </div>
    );
  }

  return (
    <div className='p-6 bg-primary-800/40 rounded-xl border border-primary-700'>
      <h2 className='text-2xl font-bold text-primary-50'>
        Список запросов AFT
      </h2>
      <div className='mt-5 space-y-2.5 max-h-[500px]
       overflow-y-scroll scrollbar-thin scrollbar-track-primary-800 scrollbar-thumb-primary-300'>
        {requests.map((request) => (
          <AftRequest
            from={{
              imgUrl: request.from.avatarUrl,
              name: request.from.name || request.from.email,
            }}
            title={request.aft.title}
            requestId={request.id}
            key={request.id}
          />
        ))}
      </div>
    </div>
  );
}