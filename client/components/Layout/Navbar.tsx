import Link from "next/link";
import React, { ReactElement } from "react";
import { FaCode, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAuthAction, selectAuth } from "../../state/AuthSlice";

export default function Navbar(): ReactElement {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(selectAuth);
  const authLinks = (
    <ul>
      <li>
        <a href="/" onClick={() => dispatch(LogoutAuthAction())}>
          <FaSignOutAlt />
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link href="/profiles">Developers</Link>
      </li>
      <li>
        <Link href="/register">Register</Link>
      </li>
      <li>
        <Link href="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link href="/">
          <a>
            <FaCode /> DevConnector
          </a>
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
}
