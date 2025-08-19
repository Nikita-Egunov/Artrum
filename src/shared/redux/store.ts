"use client"

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { profileApi } from "./apiSlices/profileSlice";

const testReducer = createSlice({
  name: "test",
  initialState: 0,
  reducers: {
    increment(state) {
      return state + 1;
    },
    decrement(state) {
      if (state > 0) {
        return state - 1;
      }
    },
  },
});



export const makeStore = () => {
  return configureStore({
    reducer: {
      [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        profileApi.middleware,
        // другие middleware...
      ),
  });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
