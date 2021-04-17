import axiosFetch from "./axiosFetch";

const setAuthToken = (token?: string) => {
  if (token) {
    axiosFetch.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete axiosFetch.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
