import { NextResponse } from "next/server";

// Example dynamic data – replace with your real data sources
async function getAllCourses() {
  return [
    "/interior-design/bdes-in-interior-design",
    "/fashion-design/bdes-in-fashion-design",
    "/graphic-design/bdes-in-graphic-design",
    "/uiux-design/bdes-in-ui-ux-design",
  ];
}

async function getAllBlogPosts() {
  return [
    "/blog/example-post-1",
    "/blog/example-post-2",
  ];
}

export async function GET() {
  const baseUrl = "https://www.inframeschool.com";

  // STATIC PAGES
  const staticUrls = [
    "/",
    "/about-us",
    "/lifeatinframe",
    "/blog",
    "/advisors",
    "/news-events",
    "/mentors",
    "/careers",
    "/download",
    "/quick-payment",

    // Categories
    "/digital-marketing",

    // Policies
    "/privacy-policy",
    "/cancellation-and-refund",
    "/terms-and-conditions",
    "/shipping-policy",
  ];

  const courses = await getAllCourses();
  const blogs = await getAllBlogPosts();

  const allUrls = [...staticUrls, ...courses, ...blogs];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map(
        (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`
      )
      .join("")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
