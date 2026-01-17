import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { phoneNumber, studentName, price, courseName } = await req.json();

    // Clean and validate phone number
    let cleanNumber = phoneNumber.replace(/\D/g, "");
    if (cleanNumber.length !== 10) {
      return NextResponse.json({
        status: "0",
        message: "Invalid phone number. Must be 10 digits.",
      });
    }
    cleanNumber = "+91" + cleanNumber;

    const params = new URLSearchParams();
    params.append("apiToken", process.env.WAPI_TOKEN!);
    params.append("phone_number_id", process.env.WAPI_PHONE_ID!);
    params.append("template_id", "297533"); 
    params.append("phone_number", cleanNumber);
    params.append("Studentname", studentName);
    params.append("courseprice", price);
    params.append("courseName", courseName);
    params.append("isOptedIn", "true");

    const res = await axios.post(
      "https://dash.wapikon.com/api/v1/whatsapp/send/template",
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return NextResponse.json(res.data);
  } catch (err: any) {
    console.error("WhatsApp API error:", err.message || err);
    return NextResponse.json({
      status: "0",
      message: err.message || "Unknown error",
    });
  }
}