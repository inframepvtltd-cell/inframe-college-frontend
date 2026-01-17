import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { SendMailOptions } from "nodemailer";

export async function POST(req: Request) {
  let transporter: Transporter | null = null;

  try {
    const body = await req.json();
    const {
      name,
      email: userEmail,
      contact,
      courseName,
      price,
      razorpay_id,
    } = body;

    if (!name || !userEmail || !contact || !courseName || !price) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // -------------------------------
    // Insert into Google Sheet
    // -------------------------------

    // Choose sheet based on course
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbybwyqKZ3dl20W9bUypS8fRsrHQjG3WESh4wegiCME1P-Oo6RM1qfh8e3o3sJooxbIc/exec";

    const sheetRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Name: name,
        Email: userEmail,
        Phone: contact,
        Course: courseName,
        Price: price,
        PaymentID: razorpay_id || "",
        Timestamp: new Date().toISOString(),
      }),
    });

    const sheetData = await sheetRes.text();

    // -------------------------------
    // Prepare Email
    // -------------------------------
    if (!process.env.NO_REPLY_MAIL || !process.env.NO_REPLY_PASS) {
      console.warn(" Mail service not configured!");
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.NO_REPLY_MAIL,
          pass: process.env.NO_REPLY_PASS,
        },
        pool: true,
        maxConnections: 3,
        maxMessages: 10,
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 60000,
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Verify transporter once
      await transporter.verify();

      // Encode payload for user URL
      const payload = { name, email: userEmail, contact };
      const encoded = Buffer.from(JSON.stringify(payload)).toString(
        "base64url"
      );
      const courseSlug = courseName.toLowerCase().replace(/\s+/g, "-");
      const courseUrl = `https://inframeschool.com/professional-online-courses/${courseSlug}?u=${encoded}`;

      // Admin email HTML
      const adminHtml = `
        <div style="font-family:Arial,sans-serif;">
          <h2>🎉 New Course Purchased</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Phone:</strong> ${contact}</p>
          <p><strong>Course:</strong> ${courseName}</p>
          <p><strong>Price:</strong> ₹${price}</p>
          <p><strong>Payment ID:</strong> ${razorpay_id}</p>
        </div>`;

      const userHtml = `
        <div style="font-family:Arial,sans-serif;">
          <h2>🎓 Your Purchase is Successful!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for purchasing <strong>${courseName}</strong>.</p>
          <p>Amount Paid: ₹${price}</p>
          <p>Payment ID: ${razorpay_id}</p>
          <a href="${courseUrl}" style="padding:10px 20px;background:#000;color:#fff;text-decoration:none;border-radius:5px;">Go to Course</a>
          <p>Happy Learning!</p>
        </div>`;

      // Plain text versions
      const adminText = `
New Course Purchased

Name: ${name}
Email: ${userEmail}
Phone: ${contact}
Course: ${courseName}
Price: ₹${price}
Payment ID: ${razorpay_id}
`;

      const userText = `
Hi ${name},

Thank you for purchasing ${courseName}.
Amount Paid: ₹${price}
Payment ID: ${razorpay_id}

Access your course here: ${courseUrl}

Happy Learning!
`;

      // Helper: Send with retry
      const sendEmailWithRetry = async (mailOptions: any, retries = 3) => {
        if (!transporter) {
          return {
            success: false,
            error: new Error("Transporter not initialized"),
          };
        }

        for (let attempt = 1; attempt <= retries; attempt++) {
          try {
            const info = await transporter.sendMail(mailOptions);
            return { success: true, info };
          } catch (err) {
            console.warn(`⚠️ Email attempt ${attempt} failed:`, err);
            if (attempt === retries) return { success: false, error: err };
            await new Promise((res) => setTimeout(res, 1000 * attempt));
          }
        }
      };

      // Send admin and user email concurrently
      const [adminResult, userResult] = await Promise.all([
        process.env.MAIL_ADMIN
          ? sendEmailWithRetry({
              from: `"Inframe School" <${process.env.NO_REPLY_MAIL}>`,
              to: process.env.MAIL_ADMIN,
              subject: `New Course Purchase: ${courseName}`,
              html: adminHtml,
              text: adminText,
            })
          : Promise.resolve({ success: false }),
        sendEmailWithRetry({
          from: `"Inframe School" <${process.env.NO_REPLY_MAIL}>`,
          to: userEmail,
          subject: `Your Course Purchase: ${courseName}`,
          html: userHtml,
          text: userText,
          replyTo: `${process.env.NO_REPLY_MAIL}`,
        }),
      ]);
    }

    return NextResponse.json({
      success: true,
      message: "Purchase logged and emails sent",
      data: sheetData,
    });
  } catch (err) {
    console.error("❌ Purchase API error:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  } finally {
    transporter?.close();
  }
}
