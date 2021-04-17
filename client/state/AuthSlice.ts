import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TLoginInfo, TRegUser, TUser } from "../types/user";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./AlertSlice";
import { RootState } from "./store";

export const isClientSide = typeof window !== "undefined";
export const tokenExsists =
  isClientSide && window.localStorage.getItem("token") ? true : false;
let clientToken = isClientSide && window.localStorage.getItem("token");

type AuthState = {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  user: TUser | null;
};
// typeof window !== "undefined" && window.localStorage.getItem("token")
const initialState: AuthState = {
  token: isClientSide && tokenExsists ? clientToken : "",
  isAuthenticated: false,
  loading: true,
  user: null,
};

//! MAIN
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    regAffirm: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    userLoaded: (state, { payload }: PayloadAction<TUser>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = payload;
    },
    authFail: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
  },
});

// custom THUNK actions :: easier than toolkit
export const LoadUserAction = () => async (dispatch) => {
  if (typeof window !== "undefined" && window.localStorage.getItem("token")) {
    setAuthToken(window.localStorage.getItem("token"));
  }
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/auth`);
    // call userLoaded
    dispatch(userLoaded(res.data));
  } catch (err) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }
    // call authError
    dispatch(authFail());
  }
};

export const RegUserAction = (user: TRegUser) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI}/users`,
      user
    );
    // console.log("AFFIRM REG ASYNC RES:", res.data);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", res.data.token);
    }

    dispatch(regAffirm(res.data.token));
    dispatch(LoadUserAction());
    return;
  } catch (err) {
    // console.log("FAIL REG ASYNC RES:", { ...err.response.data });
    const errors: { msg: string }[] = err.response.data.errors;
    errors.forEach((item) => dispatch(setAlert(item.msg, "danger")));
    return dispatch(authFail());
  }
};

export const LoginUserAction = (loginInfo: TLoginInfo) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/login`,
      loginInfo
    );
    // console.log("AFFIRM REG ASYNC RES:", res.data);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", res.data.token);
    }

    dispatch(regAffirm(res.data.token));
    dispatch(LoadUserAction());
    return;
  } catch (err) {
    // console.log("FAIL REG ASYNC RES:", { ...err.response.data });
    // const errors: { msg: string }[] = err.response.data.errors;
    // errors.forEach((item) => dispatch(setAlert(item.msg, "danger")));
    dispatch(setAlert(err.response.data.msg, "danger"));
    return dispatch(authFail());
  }
};

//! for user with useDispatch
export const { regAffirm, authFail, userLoaded } = authSlice.actions;

//* for use with useSelector
export const selectAuth = (state: RootState) => state.auth;

//? export reducer for store
export default authSlice.reducer;
