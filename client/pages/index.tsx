import Landing from "../components/Layout/Landing";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { selectAuth } from "../state/AuthSlice";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useSelector(selectAuth);

  if (isAuthenticated) {
    router.push("/dashboard");
  }

  return (
    <Layout>
      <Landing />
    </Layout>
  );
}
