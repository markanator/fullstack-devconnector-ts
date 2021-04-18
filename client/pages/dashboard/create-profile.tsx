import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitch,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { CreateProfileAction } from "../../state/ProfileSlice";
import { NewProfileFormData } from "../../types/profileTypes";
import withAuth from "../../utils/withAuth";

function createProfile(): ReactElement {
  const router = useRouter();
  const dispatch = useDispatch();
  const [toggleSocials, setToggleSocials] = useState(false);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<NewProfileFormData>();

  const onSubmit = (data) => {
    dispatch(CreateProfileAction(data, router));
    // alert(JSON.stringify(data, null, 4));
  };

  return (
    <Layout>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <FaUser /> Let's get some information to make your profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <select {...register("status")}>
            <option value="">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Company" {...register("company")} />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Website" {...register("website")} />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="Location" {...register("location")} />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="* Skills" {...register("skills")} />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            {...register("githubUsername")}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            {...register("bio")}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => setToggleSocials(!toggleSocials)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {toggleSocials && (
          <>
            <div className="form-group social-input">
              <FaTwitter className="fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                {...register("twitter")}
              />
            </div>

            <div className="form-group social-input">
              <FaFacebook className="fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                {...register("facebook")}
              />
            </div>

            <div className="form-group social-input">
              <FaYoutube className="fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                {...register("youtube")}
              />
            </div>

            <div className="form-group social-input">
              <FaLinkedin className="fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                {...register("linkedin")}
              />
            </div>

            <div className="form-group social-input">
              <FaInstagram className="fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                {...register("instagram")}
              />
            </div>

            <div className="form-group social-input">
              <FaTwitch className="fa-2x" />
              <input
                type="text"
                placeholder="Twitch URL"
                {...register("twitch")}
              />
            </div>
          </>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link href="/dashboard">
          <a className="btn btn-light my-1">Go Back</a>
        </Link>
      </form>
    </Layout>
  );
}

export default withAuth(createProfile);
