import React, { ReactElement, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadUserAction } from "../../state/AuthSlice";
import setAuthToken from "../../utils/AxiosWithAuth";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

if (typeof window !== "undefined") {
  setAuthToken(window.localStorage.getItem("token"));
}

export default function index({ children }: Props): ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadUserAction());
  }, []);

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
