import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axiosFetch from "../utils/axiosFetch";
import { setAlert } from "./AlertSlice";

type TProfileState = {
  profile: null;
  profiles: string[];
  repos: string[];
  loading: boolean;
  error: {
    msg?: string;
    status?: string;
  };
};

const initialState: TProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      (state.profile = payload), (state.loading = false);
    },
    profileError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// reducer: get_profile
// reducer: profile_error

// custom THUNK actions :: easier than toolkit
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axiosFetch.get("/profiles/me");

    dispatch(setProfile(res.data));
  } catch (err) {
    console.error(err);
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

//! for user with useDispatch
export const { setProfile, profileError } = ProfileSlice.actions;

//* Other code such as selectors can use the imported `RootState` type
export const selectProfile = (state: RootState) => state.auth;

//? export reducer for store
export default ProfileSlice.reducer;
