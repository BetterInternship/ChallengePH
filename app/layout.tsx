import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Challenge PH",
  description:
    "Bounties for real Philippine problems. Pick a brief, build a solution, earn a reward.",
  openGraph: {
    siteName: "Challenge PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
