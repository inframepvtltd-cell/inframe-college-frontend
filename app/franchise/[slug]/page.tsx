import FranchiseOverview from "../components/FranchiseOverview";
import WhyFranchise from "../components/WhyFranchise";
import FranchiseEnquiryForm from "../components/FranchiseEnquiryForm";
import InvestmentDetails from "../components/InvestmentDetails";
import FranchiseWhatsIncluded from "../components/WhatsIncluded";
import ReturnsGrowth from "../components/ReturnsGrowth";
import IndustryPlacement from "../components/IndustryPlacement";
import InframeSupport from "../components/InframeSupport";
import AffiliationAccreditation from "../components/AffiliationAccreditation";
import IdealFranchisee from "../components/IdealFranchisee";
import LocationInfrastructure from "../components/LocationInfrastructure";
import ApplicationProcess from "../components/ApplicationProcess";
import WhyStudentsChoose from "../components/WhatStudentChoose";
import FranchiseLegalAndBrochure from "../components/FranchiseLegalAndBrochure";
import FranchiseFAQ from "../components/FranchiseFAQ";
import { fetchFranchiseSEOBySlug, fetchSectionsWithItems, Section } from "../api";
import { Metadata } from "next";


interface PageProps {
  params?: { slug?: string };
}

// ---------------- Metadata ----------------
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;

  const seoData = await fetchFranchiseSEOBySlug(slug);

  if (!seoData) {
    return {
      title: "Franchise Not Found",
      description: "No franchise data available",
    };
  }

  return {
    title: seoData.meta_title,
    description: seoData.meta_desc,
    keywords: seoData.meta_keyword,
    openGraph: {
      title: seoData.meta_title,
      description: seoData.meta_desc,
      url: `/frenchise/${seoData.slugurl}`,
      type: "website",
    },
  };
}

// ---------------- Page Component ----------------
export default async function Home({ params }: any) {
  const { slug } = await params;

  const [sections, seoData] = await Promise.all([
    fetchSectionsWithItems(),
    fetchFranchiseSEOBySlug(slug),
  ]);

  if (!seoData) {
    return <div className="mt-20 text-center">Franchise Not Found</div>;
  }

  const getSection = (type: string) =>
    sections.find((s: Section) => s.section_type === type) || null;

  return (
    <>
      <FranchiseOverview
        aboutSection={getSection("About Us")}
        inframeSection={getSection("Inframe Truly")}
        heroSlider={getSection("hero")}
        seoPage={seoData}
      />
      <WhyFranchise data={getSection("Why Partner With Us")} />
      <FranchiseEnquiryForm />
      <InvestmentDetails data={getSection("Investment Plan")} />
      <FranchiseWhatsIncluded data={getSection("WHAT S INCLUDED")} />
      <ReturnsGrowth data={getSection("RETURNS and GROWTH POTENTIAL")} />
      <IndustryPlacement />
      <InframeSupport data={getSection("SUPPORT FROM INFRAME")} />
      <AffiliationAccreditation data={getSection("Partnerships  Recognition")} />
      <IdealFranchisee data={getSection("ideal_franchisee_profile")} />
      <LocationInfrastructure data={getSection("LOCATION")} />
      <ApplicationProcess
        applicationProcess={getSection("APPLICATION PROCESS")}
        requiredDetails={getSection("REQUIRED_DETAILS")}
      />
      <WhyStudentsChoose data={getSection("Why Choose Inframe")} />
      <FranchiseLegalAndBrochure
        legalSection={getSection("LEGAL and DISCLAIMER")}
        academicSection={getSection("ACADEMIC")}
      />
      <FranchiseFAQ />
    </>
  );
}
