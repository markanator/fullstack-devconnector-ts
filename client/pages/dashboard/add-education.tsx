import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { FaCodeBranch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { AddEducationAction } from "../../state/ProfileSlice";
import { IEducation } from "../../types/profileTypes";
import withAuth from "../../utils/withAuth";

function addEducation(): ReactElement {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, watch } = useForm<IEducation>();

  const isCurrent = watch("current");

  const onSubmit = (data) => {
    dispatch(AddEducationAction(data, router));
  };

  return (
    <Layout>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <FaCodeBranch />
        Add any school, bootcamp, etc that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            {...register("school", { required: true })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            {...register("degree", { required: true })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            {...register("fieldOfStudy")}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" {...register("from", { required: true })} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" value="" {...register("current")} /> Still
            Attending
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
            placeholder="Description"
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

export default withAuth(addEducation);
