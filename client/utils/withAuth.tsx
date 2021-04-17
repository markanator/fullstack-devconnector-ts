import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAuth } from "../state/AuthSlice";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const { isAuthenticated, loading } = useSelector(selectAuth);

    if (typeof window !== "undefined") {
      const clientToken = window.localStorage.getItem("token");

      if (!isAuthenticated && !loading) {
        router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
