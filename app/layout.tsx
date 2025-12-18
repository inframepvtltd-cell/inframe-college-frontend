import { Poppins } from "next/font/google";

import "./globals.css";
// import Script from "next/script";
import Head from "next/head"; // Import Next.js Head component
import Script from "next/script";
import { headers } from "next/headers";
// import { Toaster } from "react-hot-toast";
import { Toaster } from "sonner";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});



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

export const metadata = {
  verification: {
    google: "dGWC26ZkV6A4Ue6fhZdXFh5gMfWQDF3Q-3qpLE71h5M",
  },
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = (await headers()).get("x-pathname") || "/";

  const currentPage = breadcrumbPages[pathname];

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


  //   <!-- Meta Pixel Code -->
  // <script>
  // !function(f,b,e,v,n,t,s)
  // {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  // n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  // if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  // n.queue=[];t=b.createElement(e);t.async=!0;
  // t.src=v;s=b.getElementsByTagName(e)[0];
  // s.parentNode.insertBefore(t,s)}(window, document,'script',
  // 'https://connect.facebook.net/en_US/fbevents.js');

  // fbq('init', '7718921828171683');
  // fbq('track', 'PageView');
  // </script>

  // <noscript>
  // <img height="1" width="1" style="display:none"
  // src="https://www.facebook.com/tr?id=7718921828171683&ev=PageView&noscript=1"/>
  // </noscript>
  // <!-- End Meta Pixel Code -->


  return (
    <html lang="en" className={poppins.className}>
      <head>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '7718921828171683');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Title & Description */}
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />

        {/* Open Graph Metadata (for social sharing) */}

        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:image" content="https://yt3.googleusercontent.com/I3nimXEi9IpFwfTOoYovMl9RLJWHxZOewDCKXRYkrb4veYqEtu2vENdA3hLYemdtbBdta54kaQ=s160-c-k-c0x00ffffff-no-rj" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Inframe School of Art, Design & Business",
              "url": "https://www.inframeschool.com/",
              "logo": "https://www.inframeschool.com/assets/images/logo.png",
              "sameAs": [
                "https://www.facebook.com/",
                "https://www.instagram.com/",
                "https://www.youtube.com/"
              ],
              "description":
                "Inframe School offers professional courses in Interior Design, Fashion Design, Graphic Design, UI/UX, Photography and Business specialization programs."
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              "name": "Inframe School of Art, Design & Business",
              "image": "https://www.inframeschool.com/assets/images/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "First Floor, 9B, Pal Link Rd, Marudhar Nagar, Shyam Nagar",
                "addressLocality": "Jodhpur",
                "addressRegion": "Rajasthan",
                "postalCode": "342008",
                "addressCountry": "IN"
              },
              "url": "https://www.inframeschool.com/",
              "telephone": "+91 96499 64970",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "26.2389",
                "longitude": "73.0243"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ]
            }),
          }}
        />



      </head>

      <body>
        {/* Google Analytics (placed inside <body>, not inside <Head>) */}
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
            gtag('config', 'AW-16950108871');
          `}
        </Script>


        {/* Inject Breadcrumb Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=7718921828171683&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        {/* <Toaster position="top-right" /> */}
        <Toaster
          position="top-center"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
