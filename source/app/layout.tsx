import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/inter"; // Import Inter font from @fontsource
import { Providers } from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Attendance System",
  description: "Simple attendance tracking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-inter">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
