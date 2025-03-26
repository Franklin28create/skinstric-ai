import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const RoobertTrial = localFont({
  src: [
  { path: "/fonts/RoobertTRIAL-Regular.otf", weight: "300", style: "normal" },
    { path: "/fonts/RoobertTRIAL-SemiBold.otf", weight: "500", style: "normal" },
    { path: "/fonts/RoobertTRIAL-Bold.otf", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Skinstric.ai",
  description: "Let your skin shine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${RoobertTrial.className} antialiased`}
        >
        {children}
      </body>
    </html>
  );
}
