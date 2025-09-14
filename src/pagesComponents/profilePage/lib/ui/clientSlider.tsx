"use client";

import { useGetMasterAftQuery } from "@/shared/redux/apiSlices/getAftSlice";
import { Slider } from "@/widgets";

export default function ClientSlider() {
  const { isError, isLoading, isSuccess, data: arts } = useGetMasterAftQuery();

  if (isLoading) {
    return (
      <div className="h-[500px] flex justify-center items-center">
        <span className="block w-5 h-5 border-b border-l border-primary-300 animate-spin rounded-full"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[500px] flex justify-center items-center">
        <p className="bg-gradient-to-r from-accent-400 text-center mx-2.5 to-secondary-300 bg-clip-text text-transparent text-4xl">
          Что то упало... Я уже бегу фиксить баг...
        </p>
      </div>
    );
  }

  if (arts?.data.length === 0) {
    return (
      <div className="h-[500px] flex justify-center items-center">
        <p className="bg-gradient-to-r from-accent-400 text-center mx-2.5 to-secondary-300 bg-clip-text text-transparent text-4xl">
          У вас нет ни одной AFT
        </p>
      </div>
    );
  }

  return (
    <Slider
      title="Ваша коллекция"
      cards={arts?.data}
      isLoading={isLoading}
      isSuccess={isSuccess}
      canBuy={false}
    />
  );
}
