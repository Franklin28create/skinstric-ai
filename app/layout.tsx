import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const RoobertTrial = localFont({
  src: [
    { path: "/fonts/RoobertTRIAL-Regular.otf", weight: "300", style: "normal" },
    {
      path: "/fonts/RoobertTRIAL-SemiBold.otf",
      weight: "500",
      style: "normal",
    },
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
    <ClerkProvider
      appearance={{
        variables: {
          colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1c1f2e",
            colorInputBackground: "#252a41",
            colorInputText: "#fff",
        },
        elements: {
          socialButtons:
            "bg-[#0E78F9] !text-[#fff] hover:bg-[#0c62c4] rounded-xl",
          socialButtonsBlockButtonText: "#fff",
        },
      }}
    >
      <html lang="en">
        <body className={`${RoobertTrial.className} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
