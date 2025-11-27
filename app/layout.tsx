import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apex Vendors | Verified Supplier Links",
  description: "Premium Vendor Links and Suppliers for Resellers",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased relative bg-[#020204] text-foreground overflow-x-hidden`}>
        {/* 
           UPDATED GRADIENT BACKGROUND:
           - Goal: "Dark grey/black with touches of blue, not fully black"
           - "Color of the gradient primarily consumes the background" -> Increased opacity and size
           - Removed mix-blend-screen to avoid washing out the dark theme
        */}
        
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#08080a]">
          {/* Main Dark Blue/Grey Gradient Wash */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0.6),rgba(0,0,0,0.8))]" />

          {/* Top Left - Deep Navy Blue/Grey */}
          <div className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] bg-blue-950/30 rounded-full blur-[120px] animate-blob" />
          
          {/* Bottom Right - Deep Cyan/Grey */}
          <div className="absolute -bottom-[10%] -right-[10%] w-[80%] h-[80%] bg-cyan-950/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
          
          {/* Subtle noise texture overlay for "quality" feel */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
