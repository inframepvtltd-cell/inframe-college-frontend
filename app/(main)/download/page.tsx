import React from "react";
import DownloadsSection from "./components/DownloadSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Download Important Resources | Inframe School',
  description: 'Download essential resources, course materials, exam papers, and documents from Inframe School. Access study materials, prospectus, and academic resources.',
  keywords: ['downloads', 'study materials', 'exam papers', 'course resources', 'academic documents'],
  openGraph: {
    title: 'Download Center | Inframe School',
    description: 'Access all academic resources and documents in one place',
    type: 'website',
  },
};

const DownloadsPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <DownloadsSection />
    </main>
  );
};

export default DownloadsPage;