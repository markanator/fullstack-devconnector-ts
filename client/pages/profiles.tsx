import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import Alert from "../components/Alert";

interface Props {}

export default function profiles({}: Props): ReactElement {
  return (
    <Layout>
      <Alert />
      <section className="container">Profiles</section>
    </Layout>
  );
}
