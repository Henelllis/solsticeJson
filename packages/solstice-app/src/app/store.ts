import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tableStateReducer from "../features/tableState/tableStateSlice";

export const store = configureStore({
  reducer: {
    tableState: tableStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
