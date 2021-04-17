import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type Alert = {
  id: number;
  msg: string;
  alertType: string;
};

enum LoadingState {
  IDLE = "idle",
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}

type AlertState = {
  alerts: Alert[];
};

const initialState: AlertState = {
  alerts: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.push(action.payload);
    },
    removeAlert: (state, { payload }) => {
      state.alerts.filter((alert) => alert.id !== payload);
    },
  },
});

// export actions for hooks
export const { setAlert, removeAlert } = alertSlice.actions;

// export reducer for store
export default alertSlice.reducer;
