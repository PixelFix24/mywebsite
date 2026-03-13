import nodemailer from "nodemailer";

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // Gmail Configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send to customer
    await transporter.sendMail({
      from: `"PixelFix24" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1e40af;">Hallo ${name},</h2>
          <p>${message}</p>
          <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            PixelFix24<br>
            Telefon: +49 176 79817190<br>
            WhatsApp: https://wa.me/4917679817190<br>
            Website: https://pixelfix24.de
          </p>
        </div>
      `,
    });

    // Send to admin
    await transporter.sendMail({
      from: `"PixelFix24 System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[ADMIN] Autoantwort gesendet an ${name}`,
      html: `
        <h3>Autoantwort gesendet</h3>
        <p><strong>Kunde:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
    };
  } catch (error) {
    console.error("Email error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
