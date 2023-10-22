import { configureStore } from "@reduxjs/toolkit";
import { bottomSheetReducer } from "../reducers/bottomsheetReducer";

export const store = configureStore({
  reducer: {
    bottomSheet: bottomSheetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
