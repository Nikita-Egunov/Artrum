"use client";
import { closeNotif, openNotif } from "@/shared/redux/slices/notifSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export type CardProps = {
  title: string;
  id: number;
  description: string;
  imageUrl: string;
  cost: string;
  canBuy?: boolean;
};

export default function Card({
  title,
  description,
  cost,
  imageUrl,
  id,
  canBuy = true,
}: CardProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    setIsSubscribed(true);
    fetch("/api/boughtAft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((response) => {
      setIsSubscribed(false)
      if (!response.ok) {
        throw new Error("Ошибка при отправке запроса");
      }
      if (response.headers.get("Content-Type")?.includes("text/html")) {
        router.push('/sign-in');
      }
      if (response.ok) {
        setIsSuccess(true);
      }
    }).catch((error) => {
      setIsError(true)
      console.log(error);
    })
  };

  return (
    <div className="rounded-xl border border-gray-700 h-full p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4 flex flex-col justify-between h-full">
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
          {canBuy && (
            <>
              {!isSuccess ?
                <button
                  onClick={handleClick}
                  className="bg-secondary-300 text-white px-6 py-2 rounded-full
              hover:bg-secondary-400 transition-colors"
                >
                  {isSubscribed ? <span className="block w-4 aspect-square rounded-full border-b border-l border-secondary-400"></span> : 'Попросить'}
                </button>
                :
                <button
                  onClick={handleClick}
                  className={`bg-secondary-300 text-white px-6 py-2 rounded-full
              hover:bg-secondary-400 transition-colors  ${!isError ? 'opacity-50' : ''}`}
                  disabled={true}
                >
                  {!isError ? "Ждите поддтвердения" : 'Авторизуйтесь'}
                </button>
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
}
