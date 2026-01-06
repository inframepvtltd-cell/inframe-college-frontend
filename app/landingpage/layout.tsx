// app/landingpage/layout.tsx
import React from "react";

import LandingNavbar from "../../components/LandingPageNavbar";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <LandingNavbar logo="https://inframecollege.org/wp-content/uploads/2021/05/inframecollege.org_.png"/>
      <main>{children}</main>
    </div>
  );
}
