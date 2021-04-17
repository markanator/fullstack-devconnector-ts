import React, { ReactElement } from "react";
import Link from "next/link";
import { FaCode } from "react-icons/fa";

interface Props {}

export default function Navbar({}: Props): ReactElement {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link href="/">
          <a>
            <FaCode /> DevConnector
          </a>
        </Link>
      </h1>
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
    </nav>
  );
}
