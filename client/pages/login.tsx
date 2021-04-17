import axios from "axios";
import Link from "next/link";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import Alert from "../components/Alert";

interface Props {}

type FormData = {
  email: string;
  password: string;
};

export default function login({}: Props): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI}/auth/login`,
      {
        email: data.email,
        password: data.password,
      }
    );
    console.log("RES", res.data);
    // alert(JSON.stringify(data, null, 4));
  };

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
