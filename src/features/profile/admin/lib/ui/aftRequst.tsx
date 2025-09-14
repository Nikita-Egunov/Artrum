"use client"
import Image from 'next/image'
import { useState } from 'react';

interface AftRequestProps {
  title: string;
  requestId: number;
  from: {
    imgUrl: string | null;
    name: string;
  };
}

export default function AftRequest({ title, from, requestId }: AftRequestProps) {
  const [isOk, setIsOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/requests/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });

      if (response.ok) {
        setIsOk(true);
        // Обновить UI или показать уведомление
        console.log('Request approved');
      }
    } catch (error) {
      console.error('Error approving request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/requests/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId }),
      });

      if (response.ok) {
        setIsOk(true);
        // Обновить UI или показать уведомление
        console.log('Request rejected');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isOk ? 'hidden' : ''} p-4 flex justify-between items-center bg-primary-800/40 rounded-xl border border-primary-700`}>
      <p className='text-primary-100 font-medium flex-1'>{title}</p>

      <div className='flex gap-[10px] items-center flex-1 justify-center'>
        <Image
          src={from.imgUrl || '/nft.jpg'}
          alt={from.name}
          width={30}
          height={30}
          className='rounded-full w-[30px] h-[30px] object-cover'
        />
        <p className='text-primary-200'>{from.name}</p>
      </div>

      <div className='flex gap-2.5 flex-1 justify-end'>
        <button
          onClick={handleApprove}
          className='h-[30px] w-[30px] text-secondary-400 rounded-full border border-secondary-400 flex items-center justify-center hover:bg-secondary-400/20 transition-colors'
          title="Подтвердить"
        >
          ✓
        </button>
        <button
          onClick={handleReject}
          className='h-[30px] w-[30px] text-accent-400 rounded-full border border-accent-400 flex items-center justify-center hover:bg-accent-400/20 transition-colors'
          title="Отклонить"
        >
          ✗
        </button>
      </div>
    </div>
  );
}