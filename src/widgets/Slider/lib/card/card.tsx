"use client";
import Image from "next/image";
import Link from "next/link";

export type CardProps = {
  title: string;
  id: number;
  description: string;
  imageUrl: string;
  cost: string;
  canBuy?: boolean;
}

export default function Card({
  title,
  description,
  cost,
  imageUrl,
  id,
  canBuy = true
}: CardProps) {
  const handleClick = async () => {
    fetch('/api/boughtAft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при отправке запроса");
      }
    })
  }

  return (
    <div className="rounded-xl border border-gray-700 p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-square rounded-lg mb-4">
        <Image
          className="w-full h-full max-w-[420px] max-h-[420px] object-contain"
          src={imageUrl}
          alt={title}
          width={420}
          height={420}
        />
        <h3 className="text-xl max-w-fit mt-2.5 font-bold bg-gradient-to-r from-accent-400 to-secondary-300 bg-clip-text text-transparent mb-2">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary-400">{cost}₽</span>
          {canBuy &&
            <button
              onClick={handleClick}
              className="bg-secondary-300 text-white px-6 py-2 rounded-full
          hover:bg-secondary-400 transition-colors"
            >
              Купить
            </button>
          }
        </div>
      </div>
    </div>
  );
}
