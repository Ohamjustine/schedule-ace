import React, { Fragment, ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function LandingPageLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Fragment>
      <Navbar />
      <main className="pt-16 md:pt-20 min-h-screen">{children}</main>
      <Footer />
    </Fragment>
  );
}
