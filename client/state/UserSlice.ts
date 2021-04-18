import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "mark",
  },
  reducers: {
    hi: (state) => state,
  },
});

// export actions for hooks
export const { hi } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState) => state.user;

// export reducer for store
export default userSlice.reducer;
