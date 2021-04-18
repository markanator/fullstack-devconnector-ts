import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { FaGlobe } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import ProfileEducation from "../../components/profiles/ProfileEducation";
import ProfileExperience from "../../components/profiles/ProfileExperience";
import ProfileGithub from "../../components/profiles/ProfileGithub";
import Spinner from "../../components/Spinner";
import { selectAuth } from "../../state/AuthSlice";
import { GetProfileById, selectProfile } from "../../state/ProfileSlice";

interface Props {}

export default function profileDetails({}: Props): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(selectProfile);
  const auth = useSelector(selectAuth);
  useEffect(() => {
    dispatch(GetProfileById(id as string));
  }, [id]);

  if (loading || !profile) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
  return (
    <Layout>
      <Link href="/profiles">
        <a className="btn btn-light">Back To Profiles</a>
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link href="/dashboard/edit-profile">
            <a className="btn btn-dark">Edit Profile</a>
          </Link>
        )}

      <div className="profile-grid my-1">
        {/* <!-- Top --> */}
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={profile.user.avatar}
            alt={profile.user.name}
          />
          <h1 className="large">{profile.user.name}</h1>
          <p className="lead">
            {profile.status}{" "}
            {profile.company && <span> at {profile.company} </span>}
          </p>
          <p>{profile.location ? profile.location : ""}</p>
          <div className="icons my-1">
            {profile.website ? (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe className="fa-2x" />
              </a>
            ) : null}
            {profile.social
              ? Object.entries(profile.social)
                  .filter(([_, value]) => value)
                  .map(([key, value]) => (
                    <a
                      key={key}
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {key}
                    </a>
                  ))
              : null}
          </div>
        </div>

        {/* <!-- About --> */}
        <div className="profile-about bg-light p-2">
          {profile.bio && (
            <>
              <h2 className="text-primary">
                {profile.user.name.trim().split(" ")[0]}s Bio
              </h2>
              <p>{profile.bio}</p>
              <div className="line" />
            </>
          )}
          {profile.skills && (
            <>
              <h2 className="text-primary">Skill Set</h2>
              <div className="skills">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="p-1">
                    <i className="fas fa-check" /> {skill}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* <!-- Experience --> */}
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {profile.experience.length > 0 ? (
            <>
              {profile.experience.map((exp) => (
                <ProfileExperience key={exp._id} data={exp} />
              ))}
            </>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>

        {/* <!-- Education --> */}
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {profile.education.length > 0 ? (
            <>
              {profile.education.map((edu) => (
                <ProfileEducation key={edu._id} data={edu} />
              ))}
            </>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>

        {/* <!-- Github --> */}
        {profile.githubUsername && (
          <ProfileGithub username={profile.githubUsername} />
        )}
      </div>
    </Layout>
  );
}
