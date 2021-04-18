import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axiosFetch from "../utils/axiosFetch";
import { TProfileState } from "../types/profileTypes";
import { setAlert } from "./AlertSlice";
import { NextRouter } from "next/router";
import { authFail } from "./AuthSlice";

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
    getProfiles: (state, { payload }) => {
      state.profiles = payload;
      state.loading = false;
    },
    getRepos: (state, { payload }) => {
      state.repos = payload;
      state.loading = false;
    },
    profileError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.profiles = [];
      state.repos = [];
      state.loading = false;
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

export const DelExpAction = (id: string) => async (dispatch) => {
  try {
    const res = await axiosFetch.delete(`/profile/experience/${id}`);

    dispatch(setProfile(res.data));
    dispatch(setAlert("Experience removed!", "success"));
  } catch (err) {
    console.log(err.message);

    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const DelEduAction = (id: string) => async (dispatch) => {
  try {
    const res = await axiosFetch.delete(`/profile/education/${id}`);

    dispatch(setProfile(res.data));
    dispatch(setAlert("Experience removed!", "success"));
  } catch (err) {
    console.log(err.message);

    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const DelAccountAction = () => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to delete your profile? This cannot be UNDONE."
    )
  ) {
    try {
      const res = await axiosFetch.delete("/profile");

      dispatch(clearProfile());
      dispatch(authFail());
      dispatch(setAlert("Your account has been permanently removed"));
    } catch (err) {
      console.log(err.message);
      dispatch(
        profileError({
          msg: err.response.statusText,
          status: err.response.status,
        })
      );
    }
  }
};

export const GetAllProfiles = () => async (dispatch) => {
  try {
    const res = await axiosFetch.get("/profile");

    dispatch(getProfiles(res.data));
  } catch (err) {
    console.log(err.message);
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const GetProfileById = (id: string) => async (dispatch) => {
  try {
    const res = await axiosFetch.get(`/profile/user/${id}`);

    dispatch(setProfile(res.data));
  } catch (err) {
    console.log(err.message);
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const GetGithubRepos = (username: string) => async (dispatch) => {
  try {
    const res = await axiosFetch.get(`/profile/github/${username}`);

    dispatch(getRepos(res.data));
  } catch (err) {
    console.log(err.message);
    dispatch(
      profileError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

//! for user with useDispatch
export const {
  setProfile,
  profileError,
  clearProfile,
  getProfiles,
  getRepos,
} = ProfileSlice.actions;

//* Other code such as selectors can use the imported `RootState` type
export const selectProfile = (state: RootState) => state.profile;

//? export reducer for store
export default ProfileSlice.reducer;
