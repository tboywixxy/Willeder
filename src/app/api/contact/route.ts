import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";     // important for Nodemailer

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const company = (form.get("company") as string) || ""; // honeypot
    if (company) return NextResponse.json({ ok: true });

    const name = (form.get("name") as string) || "";
    const email = (form.get("email") as string) || "";
    const subject = ((form.get("subject") as string) || "Contact form").slice(0, 140);
    const message = (form.get("message") as string) || "";

    if (!name || !email || !message || !isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please fill all fields with a valid email." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // STARTTLS for 587
      auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    });

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM!,
      to: process.env.MAIL_TO!,
      replyTo: email,
      subject: `Contact • ${subject} • ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<h2>New Contact Message</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p style="white-space:pre-wrap">${message}</p>`,
    });

    // Optional: see the Ethereal preview URL in your terminal
    try {
      // @ts-ignore
      const url = nodemailer.getTestMessageUrl?.(info);
      if (url) console.log("Preview URL:", url);
    } catch {}

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
