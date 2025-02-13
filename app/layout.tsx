import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import { headers } from "next/headers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get pathname from headers
  const headersData = await headers();
  const pathname = headersData.get("x-pathname") || "";
  
  // Check if it's the landing page
  const isLandingPage = pathname.startsWith("/landingpage");

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body  className={manrope.variable}>
        {!isLandingPage && <Navbar />}
        {children}
        <Footer />
      </body>
    </html>
  );
}
