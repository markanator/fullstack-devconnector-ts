import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { FaCodeBranch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { AddExperienceAction } from "../../state/ProfileSlice";
import { IExperience } from "../../types/profileTypes";

export default function addExperience(): ReactElement {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, watch } = useForm<IExperience>();

  const isCurrent = watch("current");

  const onSubmit = (data) => {
    dispatch(AddExperienceAction(data, router));
  };

  return (
    <Layout>
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <FaCodeBranch /> Add any developer/programming positions that you have
        had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            {...register("title", { required: true })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            {...register("company", { required: true })}
            required
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" {...register("location")} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" {...register("from", { required: true })} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" value="" {...register("current")} /> Current
            Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            {...register("to")}
            disabled={isCurrent}
          />
        </div>
        <div className="form-group">
          <textarea
            cols={30}
            rows={5}
            placeholder="Job Description"
            {...register("description")}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link href="/dashboard">
          <a className="btn btn-light my-1">Go Back</a>
        </Link>
      </form>
    </Layout>
  );
}
