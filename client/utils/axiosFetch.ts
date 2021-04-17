import axios from "axios";
import { LogoutAuthAction } from "../state/AuthSlice";
import store from "../state/store";

const axiosFetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// not authorized? delete token
axiosFetch.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(LogoutAuthAction() as any);
    }
    return Promise.reject(err);
  }
);

export default axiosFetch;
