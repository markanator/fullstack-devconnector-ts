import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { RootState } from "./store";

type Alert = {
  id: string;
  msg: string;
  alertType: string;
};

const initialState: Alert[] = [];

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
        state.push(payload);
      },
    },
    removeAlert: (state, { payload }: PayloadAction<any>) => {
      // immer compliant
      state.splice(
        state.findIndex((a) => a.id === payload),
        1
      );
    },
  },
});

//! for user with useDispatch
export const { setAlert, removeAlert } = alertSlice.actions;

//* for use with useSelector
export const selectAlert = (state: RootState) => state.alert;

//? export reducer for store
export default alertSlice.reducer;
