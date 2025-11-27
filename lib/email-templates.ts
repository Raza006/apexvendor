import { Resend } from 'resend';

// If you want to use Resend (Recommended for Next.js):
// const resend = new Resend(process.env.RESEND_API_KEY);

// For now, we will define the templates here.
// This is the "Panel" to edit email content easily.

export const EMAIL_TEMPLATES = {
  // Subject line for the email
  subject: (productName: string) => `Your Order: ${productName} - Download Link`,

  // The HTML body of the email
  html: (productName: string, customerName: string, downloadLink: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Thanks for your order, ${customerName}!</h1>
      <p>You have successfully purchased <strong>${productName}</strong>.</p>
      <p>Here is your access link:</p>
      <a href="${downloadLink}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
        Access Vendor Link
      </a>
      <p>If the button doesn't work, copy this link:</p>
      <p>${downloadLink}</p>
      <hr />
      <p style="font-size: 12px; color: #666;">Apex Vendors - Verified Suppliers</p>
    </div>
  `,
  
  // Plain text fallback
  text: (productName: string, downloadLink: string) => 
    `Thanks for buying ${productName}! Your link: ${downloadLink}`
};

// Function to actually send the email
export async function sendOrderEmail(email: string, productName: string, downloadLink: string) {
  // Check if API key exists
  if (!process.env.RESEND_API_KEY) {
    console.log("⚠️ RESEND_API_KEY missing. logging email to console instead.");
    console.log(`To: ${email}, Product: ${productName}, Link: ${downloadLink}`);
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Apex Vendors <noreply@yourdomain.com>', // You need to verify a domain on Resend
      to: email,
      subject: EMAIL_TEMPLATES.subject(productName),
      html: EMAIL_TEMPLATES.html(productName, "Valued Customer", downloadLink),
    });
    console.log(`✅ Email sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}

