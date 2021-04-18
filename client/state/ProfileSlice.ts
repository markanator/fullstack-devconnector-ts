import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axiosFetch from "../utils/axiosFetch";
import { TProfileState } from "../types/profileTypes";
import { setAlert } from "./AlertSlice";
import { NextRouter } from "next/router";

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
    console.error(err.message);
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const CreateProfileAction = (
  formData,
  router: NextRouter,
  edit = false
) => async (dispatch) => {
  try {
    const res = await axiosFetch.post("/profile", formData);

    dispatch(setProfile(res.data));
    dispatch(
      setAlert(edit ? "Profile updated!" : "Profile Created!", "success")
    );
    if (!edit) {
      router.push("/dashboard");
    }
  } catch (err) {
    console.log(err.message);

    const errors: { msg: string }[] = err.response.data.errors;
    errors.forEach((item) => dispatch(setAlert(item.msg, "danger")));

    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

// update Profile
export const AddExperienceAction = (formData, router: NextRouter) => async (
  dispatch
) => {
  try {
    const res = await axiosFetch.put("/profile/experience", formData);

    dispatch(setProfile(res.data));
    dispatch(setAlert("Experience Added!", "success"));

    router.push("/dashboard");
  } catch (err) {
    console.log(err.message);

    const errors: { msg: string }[] = err.response.data.errors;
    errors.forEach((item) => dispatch(setAlert(item.msg, "danger")));

    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const AddEducationAction = (formData, router: NextRouter) => async (
  dispatch
) => {
  try {
    const res = await axiosFetch.put("/profile/education", formData);

    dispatch(setProfile(res.data));
    dispatch(setAlert("Education Added!", "success"));

    router.push("/dashboard");
  } catch (err) {
    console.log(err.message);

    const errors: { msg: string }[] = err.response.data.errors;
    errors.forEach((item) => dispatch(setAlert(item.msg, "danger")));

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
