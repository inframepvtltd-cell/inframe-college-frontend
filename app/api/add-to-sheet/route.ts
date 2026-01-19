import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzhQmzA83wyUVOBIwYCHGtOD5zzKnyMJ4NXtjeNjoLbC4k0r4JSUErnlqfdza8AU68E/exec"
    const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const text = await res.text();

    return NextResponse.json({ success: true, data: text });
}
