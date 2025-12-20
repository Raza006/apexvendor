import { Resend } from 'resend';
import * as fs from 'fs';
import * as path from 'path';

// If you want to use Resend (Recommended for Next.js):
// const resend = new Resend(process.env.RESEND_API_KEY);

// For now, we will define the templates here.
// This is the "Panel" to edit email content easily.

export const EMAIL_TEMPLATES = {
  // Subject line for the email
  subject: (productName: string) => `Your Order: ${productName} - Download Link`,

  // The HTML body of the email
  html: (productName: string, customerName: string, downloadLink: string, hasPDF: boolean = false, vendorUrl?: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333; margin-bottom: 20px;">Thank You for Your Order! 🎉</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Hi ${customerName},
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Here is your <a href="${vendorUrl || downloadLink}" style="color: #0066cc; text-decoration: none; font-weight: bold;">${productName}</a>.
        </p>
        ${hasPDF ? `
        <div style="background-color: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066cc;">
          <p style="margin: 0; color: #0066cc; font-weight: bold;">📎 Instructions Attached</p>
          <p style="margin: 10px 0 0 0; color: #555; font-size: 14px;">
            Please check the attached PDF file for detailed instructions on how to access and use your vendor links.
          </p>
        </div>
        ` : ''}
        ${vendorUrl ? `
        <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #0066cc;">
          <p style="margin: 0 0 10px 0; color: #0066cc; font-weight: bold; font-size: 16px;">🔗 Your Vendor Link:</p>
          <a href="${vendorUrl}" style="display: inline-block; color: #0066cc; text-decoration: underline; word-break: break-all; font-size: 14px;">
            ${vendorUrl}
          </a>
        </div>
        ` : ''}
        <p style="font-size: 14px; color: #777; line-height: 1.6; margin-top: 20px;">
          ${hasPDF ? 'Check the attached PDF for detailed instructions on how to use your vendor link.' : 'Click the link above to access your vendor.'}
        </p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;" />
        <div style="text-align: center;">
          <p style="font-size: 12px; color: #999; margin: 0 0 10px 0;">
            <strong>Apex Vendors</strong> - Verified Suppliers<br/>
            Need help? Contact us at orders@apexsupplierlinks.com
          </p>
          <a href="https://discord.com/invite/PBEXChby4H" style="display: inline-block; margin-top: 10px; padding: 10px 20px; background-color: #5865F2; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 12px; font-weight: bold;">
            Join Our Discord Community
          </a>
        </div>
      </div>
    </div>
  `,
  
  // Plain text fallback
  text: (productName: string, downloadLink: string) => 
    `Thanks for buying ${productName}! Your link: ${downloadLink}`
};

// Function to actually send the email
export async function sendOrderEmail(
  email: string, 
  productName: string, 
  downloadLink: string, 
  pdfFileName?: string,
  customerName?: string,
  vendorUrl?: string
) {
  // Check if API key exists
  if (!process.env.RESEND_API_KEY) {
    console.log("⚠️ RESEND_API_KEY missing. logging email to console instead.");
    console.log(`To: ${email}, Product: ${productName}, Link: ${downloadLink}, PDF: ${pdfFileName}`);
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Check if we have a PDF to attach
    const hasPDF = !!pdfFileName;
    const displayName = customerName || "Valued Customer";

    console.log("📤 Preparing email for:", email);
    console.log("📤 From: orders@apexsupplierlinks.com");
    console.log("📤 Product:", productName);

    // Prepare email options
    const emailOptions: any = {
      from: 'Apex Vendors <orders@apexsupplierlinks.com>',
      to: email,
      subject: EMAIL_TEMPLATES.subject(productName),
      html: EMAIL_TEMPLATES.html(productName, displayName, downloadLink, hasPDF, vendorUrl),
    };

    // Attach PDF if provided
    if (pdfFileName) {
      const pdfPath = path.join(process.cwd(), 'public', 'pdfs', pdfFileName);
      
      // Check if PDF exists
      if (fs.existsSync(pdfPath)) {
        const pdfContent = fs.readFileSync(pdfPath);
        emailOptions.attachments = [
          {
            filename: pdfFileName,
            content: pdfContent,
          }
        ];
        console.log(`📎 Attaching PDF: ${pdfFileName}`);
      } else {
        console.warn(`⚠️ PDF not found: ${pdfPath}`);
      }
    }

    const result = await resend.emails.send(emailOptions);
    console.log(`✅ Email sent to ${email} with ${pdfFileName ? 'PDF attachment' : 'no attachment'}`);
    console.log(`✅ Resend result:`, result);
  } catch (error: any) {
    console.error("❌ Failed to send email:", error);
    console.error("❌ Error message:", error?.message);
    console.error("❌ Error details:", JSON.stringify(error, null, 2));
    throw error; // Re-throw so the webhook can log it
  }
}

