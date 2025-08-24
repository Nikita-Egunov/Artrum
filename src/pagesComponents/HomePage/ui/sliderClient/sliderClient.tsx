"use client"

import { useGetAftQuery } from "@/shared/redux/apiSlices/getAftSlice";
import { Slider } from "@/widgets";

export default function SliderClient() {
  const { isError, isLoading, isSuccess, data } = useGetAftQuery();

  return (
    <Slider
      title="Доступные для покупки арты"
      isLoading={isLoading}
      isSuccess={isSuccess}
      cards={data?.data}
    />
  )
}