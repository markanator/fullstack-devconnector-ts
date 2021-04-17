import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import Logger from "redux-logger";
import alertReducer from "./AlertSlice";
import authReducer from "./AuthSlice";
import profileReducer from "./ProfileSlice";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const middleware = [...getDefaultMiddleware(), Logger];

export default configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});
