"use client";

import { useGetAftQuery } from "@/shared/redux/apiSlices/getAftSlice";
import { Slider } from "@/widgets";

export default function SliderClient({ title }: { title: string }) {
  const { isError, isLoading, isSuccess, data } = useGetAftQuery();

  return (
    <Slider
      title={title}
      isLoading={isLoading}
      isSuccess={isSuccess}
      cards={data?.data}
    />
  );
}
