import LandingPageLayoutWrapper from "@/layouts/components/landing-page/landing-page-layout-wrapper";
import HomePage from "@/modules/home/components/overview";

export default function Home() {
  return (
    <LandingPageLayoutWrapper>
      <HomePage />
    </LandingPageLayoutWrapper>
  );
}
