import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";
import Layout from "../components/Layout";
import { LoginUserAction, selectAuth } from "../state/AuthSlice";

interface Props {}

type FormData = {
  email: string;
  password: string;
};

export default function login({}: Props): ReactElement {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data) => {
    dispatch(LoginUserAction({ email: data.email, password: data.password }));
  };

  // redirect if authed
  if (isAuthenticated) {
    router.push("/dashboard");
  }

  return (
    <Layout>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="mark@example.com"
              autoComplete="email"
              required
              {...register("email", { required: true })}
            />
            <p>{errors.email && "Email is required"}</p>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              minLength={6}
              required
              autoComplete="current-password"
              {...register("password", { required: true, min: 6 })}
            />
            <p>{errors.password && "Password is required."}</p>
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link href="/register">Sign Up</Link>
        </p>
      </section>
    </Layout>
  );
}
