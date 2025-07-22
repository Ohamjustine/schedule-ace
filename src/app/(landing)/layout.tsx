import LandingPageLayoutWrapper from "@/layouts/components/landing-page/landing-page-layout-wrapper";
import React, { Fragment, ReactNode } from "react";

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Fragment>
      <LandingPageLayoutWrapper>{children}</LandingPageLayoutWrapper>
    </Fragment>
  );
}
