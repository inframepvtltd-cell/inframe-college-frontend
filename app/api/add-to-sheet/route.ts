import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 🔹 Choose Google Script URL based on courseName
        let GOOGLE_SCRIPT_URL = "";

        if (body.courseName?.toLowerCase().includes("interior")) {
            GOOGLE_SCRIPT_URL =
                "https://script.google.com/macros/s/AKfycbyuRyKXdCQX-IEMbRLuJxEFbzx5Xeq0_OZcY_aWeJE_q4_AU8AaGP2BFsFhoJr7IHDx/exec"; // Interior Design Sheet
        } else if (body.courseName?.toLowerCase().includes("graphic")) {
            GOOGLE_SCRIPT_URL =
                "https://script.google.com/macros/s/AKfycbwx9PruN1RDNDHczkG__okRIRLDu_wziFe8seDHJF88QqVvXsTYGwmq37je6MV736B7/exec"; // Graphic Design Sheet
        } else {
            // Default sheet if course not matched
            GOOGLE_SCRIPT_URL =
                "https://script.google.com/macros/s/AKfycbyuRyKXdCQX-IEMbRLuJxEFbzx5Xeq0_OZcY_aWeJE_q4_AU8AaGP2BFsFhoJr7IHDx/exec"; // Default Interior Design sheet
        }

        // 🔹 POST to Google Script
        const res = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const text = await res.text();

        return NextResponse.json({ success: true, data: text });
    } catch (err) {
        console.error("Add-to-sheet failed:", err);
        return NextResponse.json({ success: false, error: err.message });
    }
}
