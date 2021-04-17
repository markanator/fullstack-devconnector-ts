import React, { ReactElement } from "react";
import Layout from "../components/Layout";

interface Props {}

export default function profiles({}: Props): ReactElement {
  return (
    <Layout>
      <section className="container">Profiles</section>
    </Layout>
  );
}
