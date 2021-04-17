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

//! Main sauce
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
      reducer: (state, { payload }: PayloadAction<Alert>) => {
        state.alerts.push(payload);
      },
    },
    removeAlert: (state, { payload }: PayloadAction<Number>) => {
      state.alerts.filter((alert) => alert.id !== payload);
    },
  },
});

//! for user with useDispatch
export const { setAlert, removeAlert } = alertSlice.actions;

//* for use with useSelector
export const selectAlert = (state: RootState) => state.alert.alerts;

//? export reducer for store
export default alertSlice.reducer;
