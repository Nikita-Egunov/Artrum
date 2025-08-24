"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type AftType = {
  data: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    cost: string;
  }[]
}

export const aftApi = createApi({
  reducerPath: "getAft",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Aft"],
  endpoints: (builder) => ({
    getAft: builder.query<AftType, void>({
      query: () => "/getArts",
      providesTags: ["Aft"],
    }),
  })
})

export const {
  useGetAftQuery,
} = aftApi;
