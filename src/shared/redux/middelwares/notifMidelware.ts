// notifListener.ts
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { closeNotif } from "../slices/notifSlice";
import type { RootState, AppDispatch } from "../store";

export const notifListenerMiddleware = createListenerMiddleware();

// Используем withTypes() для типизации
notifListenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  actionCreator: closeNotif,
  effect: async (action, listenerApi) => {
    const currentState = listenerApi.getState(); // Теперь типизирован!
    const redirectUrl = currentState.notif.redirectUrl;

    if (redirectUrl) {
      try {
        window.location.replace(redirectUrl);
      } catch (error) {
        console.error("Error redirecting:", error);
      }
    }
  }
});

export const { middleware } = notifListenerMiddleware;