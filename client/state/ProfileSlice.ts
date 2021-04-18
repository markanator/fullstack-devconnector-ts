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

//! MAIN
export const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      state.profile = payload;
      state.loading = false;
    },
    profileError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.repos = [];
    },
  },
});

// reducer: get_profile
// reducer: profile_error

//* custom THUNK actions :: easier than toolkit
export const GetCurrentProfileAction = () => async (dispatch) => {
  try {
    const res = await axiosFetch.get("/profile/me");

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
export const { setProfile, profileError, clearProfile } = ProfileSlice.actions;

//* Other code such as selectors can use the imported `RootState` type
export const selectProfile = (state: RootState) => state.profile;

//? export reducer for store
export default ProfileSlice.reducer;
