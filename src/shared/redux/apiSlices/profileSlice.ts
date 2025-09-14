"use client";
import { User } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // ← Исправлен импорт

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // ← Упрощен baseUrl
    prepareHeaders: (headers) => {
      // Добавляем необходимые заголовки если нужно
      return headers;
    },
  }),
  tagTypes: ["Profile"], // ← Добавлены теги для инвалидации кэша
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      // ← Исправлен тип параметра
      query: () => "/getUser",
      providesTags: ["Profile"], // ← Добавлен тег
    }),
  }),
});

// Правильный экспорт хуков
export const {
  useGetProfileQuery, // ← Query хуки имеют суффикс Query
} = profileApi;
