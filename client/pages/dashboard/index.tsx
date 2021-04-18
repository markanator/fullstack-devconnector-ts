import Link from "next/link";
import React, { ReactElement, useEffect } from "react";
import { FaUser, FaUserMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert";
import DashButtons from "../../components/dashboard/DashButtons";
import ListEdu from "../../components/dashboard/ListEdu";
import ListExp from "../../components/dashboard/ListExp";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import { selectAuth } from "../../state/AuthSlice";
import {
  GetCurrentProfileAction,
  selectProfile,
} from "../../state/ProfileSlice";
import withAuth from "../../utils/withAuth";

function dashboard(): ReactElement {
  const dispatch = useDispatch();
  const { profile } = useSelector(selectProfile);
  const { loading: authLoading, user } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(GetCurrentProfileAction());
  }, []);

  return authLoading && profile !== null ? (
    <Spinner />
  ) : (
    <Layout>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <FaUser /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashButtons />
          <ListExp />
          <ListEdu />

          <div className="my-2">
            <button className="btn btn-danger">
              <FaUserMinus />
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You don't appear to have a profile, please add some info.</p>
          <br />
          <Link href="/dashboard/create-profile">
            <a>Create Profile</a>
          </Link>
        </>
      )}
    </Layout>
  );
}

export default withAuth(dashboard);
