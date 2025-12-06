import { NextResponse } from "next/server";

export async function GET() {
  const courses = [
    { slug: "interior-design/bdes-in-interior-design" },
    { slug: "fashion-design/bdes-in-fashion-design" },
    { slug: "graphic-design/bdes-in-graphic-design" },
    { slug: "uiux-design/bdes-in-ui-ux-design" }
  ];
  return NextResponse.json(courses);
}
