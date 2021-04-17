import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuth } from "../state/AuthSlice";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { isAuthenticated } = useSelector(selectAuth);

    if (typeof window !== "undefined") {
      const clientToken = window.localStorage.getItem("token");

      if (!clientToken || !isAuthenticated) {
        router.replace("/login");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
