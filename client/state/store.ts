import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import Logger from "redux-logger";
import alertReducer from "./AlertSlice";
import userReducer from "./UserSlice";
import authReducer from "./AuthSlice";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const middleware = [...getDefaultMiddleware(), Logger];

export default configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});
