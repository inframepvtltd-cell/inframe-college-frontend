import { Poppins } from "next/font/google";
import { headers } from "next/headers"; // ✅ Get pathname dynamically on the server
import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Metadata object for SEO & verification
export const metadata: Metadata = {
  title:
    "Inframe School: Best Art, Design & Business School in Jodhpur | Top College for Creative Education",
  description:
    "Inframe School of Art, Design & Business is a Leading Institution in Jodhpur with Over 15 Years of Excellence. We are the Trusted Choice for Creative Education in Jodhpur.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title:
      "Inframe School: Best Art, Design & Business School in Jodhpur | Top College for Creative Education",
    description:
      "Inframe School of Art, Design & Business is a Leading Institution in Jodhpur with Over 15 Years of Excellence. We are the Trusted Choice for Creative Education in Jodhpur.",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "https://yt3.googleusercontent.com/I3nimXEi9IpFwfTOoYovMl9RLJWHxZOewDCKXRYkrb4veYqEtu2vENdA3hLYemdtbBdta54kaQ=s160-c-k-c0x00ffffff-no-rj",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  other: {
    "google-site-verification": "dGWC26ZkV6A4Ue6fhZdXFh5gMfWQDF3Q-3qpLE71h5M",
  },
};

// Define breadcrumb mapping for static pages
const breadcrumbPages: Record<string, { name: string; url: string }> = {
  "/about": { name: "About Us", url: "https://www.inframeschool.com/about" },
  "/courses": { name: "Courses", url: "https://www.inframeschool.com/courses" },
  "/blog": { name: "Blog", url: "https://www.inframeschool.com/blog" },
  "/contact": {
    name: "Contact Us",
    url: "https://www.inframeschool.com/contact",
  },
  "/lifeatinframe": {
    name: "Student Life",
    url: "https://www.inframeschool.com/lifeatinframe",
  },
  "/careers": { name: "Careers", url: "https://www.inframeschool.com/careers" },
  "/download": {
    name: "Download Resources",
    url: "https://www.inframeschool.com/download",
  },
  "/mentors": { name: "Mentors", url: "https://www.inframeschool.com/mentors" },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Get the current pathname dynamically from headers
  const pathname = (await headers()).get("x-pathname") || "/";

  const currentPage = breadcrumbPages[pathname];

  // Breadcrumb Schema for Static Pages
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.inframeschool.com",
      },
      ...(currentPage
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: currentPage.name,
              item: currentPage.url,
            },
          ]
        : []),
    ],
  };

  return (
    <html lang="en" className={poppins.className}>
       <head>
    <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
  </head>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1Q0ED5JDYB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1Q0ED5JDYB');
          `}
        </Script>

        {/* Inject Breadcrumb Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        {children}
      </body>
    </html>
  );
}
