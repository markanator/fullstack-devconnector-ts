import React, { ReactElement, useEffect } from "react";
import { FaConnectdevelop } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import IndividualProfile from "../../components/profiles/IndividualProfile";
import Spinner from "../../components/Spinner";
import { GetAllProfiles, selectProfile } from "../../state/ProfileSlice";

interface Props {}

export default function profilesIndex({}: Props): ReactElement {
  const { profiles, loading } = useSelector(selectProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProfiles());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <FaConnectdevelop /> Browse and connect with developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? (
          profiles.map((prof) => (
            <IndividualProfile key={prof.id} data={prof} />
          ))
        ) : (
          <h4>No profiles found.</h4>
        )}
      </div>
    </Layout>
  );
}
