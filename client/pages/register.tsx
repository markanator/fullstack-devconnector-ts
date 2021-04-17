import React, { ReactElement } from "react";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setAlert } from "../state/AlertSlice";
import Layout from "../components/Layout";
import Alert from "../components/Alert";

interface Props {}

type FormData = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

export default function register({}: Props): ReactElement {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data) => {
    if (data.password !== data.password2) {
      // console.log("PASSWORDS DO NOT MATCH");
      dispatch(setAlert("Passwords do not match.", "danger"));
    } else {
      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/users`,
        newUser
      );
      console.log("RES", res.data);
      // alert(JSON.stringify(data, null, 4));
    }
  };

  return (
    <Layout>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="name"
              required
              autoComplete="first-name"
              {...register("name", { required: true, min: 2 })}
            />
            <p>{errors.name && "Name is required"}</p>
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="e-mail"
              required
              autoComplete="new-password"
              {...register("email", { required: true })}
            />
            <small className="form-text">
              {errors.email
                ? "Email is required"
                : "This site uses Gravatar so if you want a profile image, use a Gravatar email"}
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="******"
              minLength={6}
              required
              autoComplete="new-password"
              {...register("password", {
                required: true,
                min: 6,
                minLength: 6,
              })}
            />
            <p>{errors.password && "Password is required."}</p>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="******"
              minLength={6}
              required
              autoComplete="new-password"
              {...register("password2", {
                required: true,
                min: 6,
                minLength: 6,
              })}
            />
            <p>{errors.password2 && "Please confirm password."}</p>
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link href="/login">Sign In</Link>
        </p>
      </section>
    </Layout>
  );
}
