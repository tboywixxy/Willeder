// /app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer, { getTestMessageUrl, type SentMessageInfo } from "nodemailer";

export const runtime = "nodejs"; // required for Nodemailer on Vercel

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot (bots)
    const company = (form.get("company") as string) || "";
    if (company) return NextResponse.json({ ok: true });

    const name = (form.get("name") as string)?.trim() || "";
    const email = (form.get("email") as string)?.trim() || "";
    // Accept either "phone" (new) or "subject" (legacy) to avoid breaking older pages
    const phone =
      ((form.get("phone") as string) || (form.get("subject") as string) || "").trim();
    const message = (form.get("message") as string)?.trim() || "";

    if (!name || !email || !message || !isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Please fill all fields with a valid email." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.MAIL_FROM;
    const to = process.env.MAIL_TO;

    if (!host || !user || !pass || !from || !to) {
      console.error("Missing required SMTP env vars.");
      return NextResponse.json(
        { ok: false, error: "Server misconfiguration." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subjectLine = `Contact • ${name}${phone ? ` • ${phone}` : ""}`;

    const info: SentMessageInfo = await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: subjectLine,
      text:
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        (phone ? `Phone: ${phone}\n` : "") +
        `\n${message}`,
      html: `<h2>New Contact Message</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
             <hr />
             <pre style="white-space:pre-wrap;font:inherit">${message}</pre>`,
    });

    const previewUrl = getTestMessageUrl(info);
    if (previewUrl) console.log("Preview URL:", previewUrl);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
