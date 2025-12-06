// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.inframeschool.com";

  const urls = [
    "",
    "/about-us",
    "/lifeatinframe",
    "/blog",
    "/advisors",
    "/news-events",
    "/mentors",
  ].map((p) => `${baseUrl}${p}`);

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((url) => `<url><loc>${url}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`).join("")}
  </urlset>`;

  return new NextResponse(sitemapXml, {
    headers: { "Content-Type": "application/xml" },
  });
}
