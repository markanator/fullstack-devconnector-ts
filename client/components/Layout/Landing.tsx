import React, { ReactElement } from "react";
import Link from "next/link";

interface Props {}

export default function Landing({}: Props): ReactElement {
  return (
    <>
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link href="/register">
              <a className="btn btn-primary">Sign Up</a>
            </Link>
            <Link href="/login">
              <a className="btn btn-light">Login</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
