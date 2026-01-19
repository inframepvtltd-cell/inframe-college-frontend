import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Enter in sheet!!");
  
  const body = await req.json();

  const GOOGLE_SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbxbr8hzMDl7OT1XGHXXIzhoCbe1fOH0ZmMjKmXnmpYXG5qoqitQwiD9tViLso4-L_zR/exec";

  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  console.log("Google Sheet response:", text);

  return NextResponse.json({ success: true, data: text });
}