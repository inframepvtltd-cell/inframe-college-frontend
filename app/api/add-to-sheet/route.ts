import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbyuRyKXdCQX-IEMbRLuJxEFbzx5Xeq0_OZcY_aWeJE_q4_AU8AaGP2BFsFhoJr7IHDx/exec";

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