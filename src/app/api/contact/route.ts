import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const body = await req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Noreina Studio <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL ?? "hello@noreina.studio"],
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #f0f0f0; padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 28px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #3b82f6, #7c3aed); display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 14px;">N</span>
            </div>
            <div>
              <div style="color: white; font-weight: 600; font-size: 14px;">Noreina Studio</div>
              <div style="color: #6b7280; font-size: 11px;">New Contact Message</div>
            </div>
          </div>

          <h2 style="color: white; font-size: 20px; font-weight: 700; margin: 0 0 20px; letter-spacing: -0.5px;">
            New message from ${name}
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="color: #6b7280; font-size: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); width: 100px; text-transform: uppercase; letter-spacing: 1px;">Name</td>
              <td style="color: #f0f0f0; font-size: 14px; padding: 10px 0 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);">${name}</td>
            </tr>
            <tr>
              <td style="color: #6b7280; font-size: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); text-transform: uppercase; letter-spacing: 1px;">Email</td>
              <td style="padding: 10px 0 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                <a href="mailto:${email}" style="color: #3b82f6; font-size: 14px; text-decoration: none;">${email}</a>
              </td>
            </tr>
            ${company ? `
            <tr>
              <td style="color: #6b7280; font-size: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); text-transform: uppercase; letter-spacing: 1px;">Company</td>
              <td style="color: #f0f0f0; font-size: 14px; padding: 10px 0 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);">${company}</td>
            </tr>
            ` : ""}
          </table>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <div style="color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Message</div>
            <p style="color: #a8a8b3; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; font-size: 13px; font-weight: 600; padding: 12px 24px; border-radius: 10px; text-decoration: none;">
            Reply to ${name} →
          </a>

          <p style="color: #6b7280; font-size: 11px; margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.06);">
            Sent via Noreina Studio contact form · ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
