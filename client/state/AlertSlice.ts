import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { RootState } from "./store";

type Alert = {
  id: number;
  msg: string;
  alertType: string;
};

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
    setAlert: {
      prepare: (msg: string, alertType: string) => ({
        payload: {
          id: uuid(),
          msg,
          alertType,
        },
      }),
      reducer: (state, action: PayloadAction<Alert>) => {
        state.alerts.push(action.payload);
      },
    },
    removeAlert: (state, { payload }) => {
      state.alerts.filter((alert) => alert.id !== payload);
    },
  },
});

// export actions for hooks
export const { setAlert, removeAlert } = alertSlice.actions;

//  * Extract alerts from root state
export const selectAlert = (state: RootState) => state.alert.alerts;

// export reducer for store
export default alertSlice.reducer;
