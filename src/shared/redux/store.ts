"use client"

import notifReducer from "./slices/notifSlice";
import { configureStore, createSlice, EnhancedStore } from "@reduxjs/toolkit";
import { profileApi } from "./apiSlices/profileSlice";
import { middleware as notifMiddleware } from "./middelwares/notifMidelware";
import { aftApi } from "./apiSlices/getAftSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
      [profileApi.reducerPath]: profileApi.reducer,
      [aftApi.reducerPath]: aftApi.reducer,
      notif: notifReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(
          profileApi.middleware,
        )
        .concat(
          aftApi.middleware,
        )
        .prepend(
          notifMiddleware
        )
    // другие middleware...
  });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
