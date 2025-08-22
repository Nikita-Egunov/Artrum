import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Тип для состояния
type NotifState = {
  isOpen: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
  redirectUrl: string | null; // добавляем поле для хранения URL
}

// Тип для payload действия openNotif
type OpenNotifPayload = {
  message: string;
  type: "success" | "error" | "warning" | "info";
  redirectUrl: string | null;
}

// Начальное состояние
const initialState: NotifState = {
  isOpen: false,
  message: "",
  type: "info", // лучше задать значение по умолчанию
  redirectUrl: null, // добавляем поле для хранения URL
};

export const notifSlice = createSlice({
  name: "notif",
  initialState,
  reducers: {
    openNotif: (state, action: PayloadAction<OpenNotifPayload>) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.redirectUrl = action.payload.redirectUrl; // сохраняем URL
    },
    closeNotif: (state) => {
      state.isOpen = false;
      state.message = "";
      state.type = "info";
      state.redirectUrl = null; // сбрасываем URL
    },
  }
});

// Экспорт действий
export const { openNotif, closeNotif } = notifSlice.actions;

// Экспорт редюсера
export default notifSlice.reducer;