import Link from "next/link";
import React, { ReactElement } from "react";
import { FaBlackTie, FaGraduationCap, FaUserCircle } from "react-icons/fa";

export default function DashButtons(): ReactElement {
  return (
    <div className="dash-buttons">
      <Link href="/dashboard/edit-profile">
        <a className="btn btn-light">
          <FaUserCircle className=" text-primary" />
          Edit Profile
        </a>
      </Link>
      <Link href="/dashboard/add-experience">
        <a className="btn btn-light">
          <FaBlackTie className="text-primary" />
          Add Experience
        </a>
      </Link>
      <Link href="/dashboard/add-education">
        <a className="btn btn-light">
          <FaGraduationCap className="text-primary" />
          Add Education
        </a>
      </Link>
    </div>
  );
}
