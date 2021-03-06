import { useRouter } from "next/router";
import React, { ReactElement, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadUserAction, LogoutAuthAction } from "../../state/AuthSlice";
import setAuthToken from "../../utils/setAuthToken";
import Alert from "../Alert";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function index({ children }: Props): ReactElement {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");

      if (token) {
        console.log("WINDOW TOKEN", token);
        setAuthToken(token);
      }

      dispatch(LoadUserAction());

      // log user out from all tabs if they log out in one tab
      window.addEventListener("storage", () => {
        if (!token) dispatch(LogoutAuthAction());
      });
    }
  }, []);
  const isLandingPage = router.pathname === "/";

  return (
    <>
      <Navbar />
      <main>
        <section className={isLandingPage ? "landing" : "container"}>
          <Alert />
          {children}
        </section>
      </main>
    </>
  );
}
