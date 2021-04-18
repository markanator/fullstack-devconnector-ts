import Link from "next/link";
import React, { ReactElement, useEffect } from "react";
import { FaUser, FaUserMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert";
import DashButtons from "../../components/dashboard/DashButtons";
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

          <h2 className="my-2">Experience Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th className="hide-sm">Title</th>
                <th className="hide-sm">Years</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tech Guy Web Solutions</td>
                <td className="hide-sm">Senior Developer</td>
                <td className="hide-sm">02-03-2009 - 01-02-2014</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Traversy Media</td>
                <td className="hide-sm">Instructor & Developer</td>
                <td className="hide-sm">02-03-2015 - Now</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="my-2">Education Credentials</h2>
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th className="hide-sm">Degree</th>
                <th className="hide-sm">Years</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Northern Essex</td>
                <td className="hide-sm">Associates</td>
                <td className="hide-sm">02-03-2007 - 01-02-2009</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

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
