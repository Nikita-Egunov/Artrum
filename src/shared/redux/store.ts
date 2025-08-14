import { configureStore, createSlice } from "@reduxjs/toolkit";

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
      testReducer: testReducer.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
