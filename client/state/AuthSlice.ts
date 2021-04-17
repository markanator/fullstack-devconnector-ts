import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TRegUser } from "../types/user";
import { setAlert } from "./AlertSlice";
import { RootState } from "./store";

type AuthState = {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
};
// typeof window !== "undefined" && window.localStorage.getItem("token")
const initialState: AuthState = {
  token: "",
  isAuthenticated: false,
  loading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    regAffirm: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    regFail: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

// custom THUNK actions :: easier than toolkit
export const RegUserAction = (user: TRegUser) => async (dispath) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI}/users`,
      user
    );
    // console.log("AFFIRM REG ASYNC RES:", res.data);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", res.data.token);
    }

    return dispath(regAffirm(res.data.token));
  } catch (err) {
    // console.log("FAIL REG ASYNC RES:", { ...err.response.data });
    const errors: { msg: string }[] = err.response.data.errors;
    errors.forEach((item) => dispath(setAlert(item.msg, "danger")));
    return dispath(regFail);
  }
};

//! for user with useDispatch
export const { regAffirm, regFail } = authSlice.actions;

//* for use with useSelector
export const selectAuth = (state: RootState) => state.auth;

//? export reducer for store
export default authSlice.reducer;
