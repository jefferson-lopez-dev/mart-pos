import type { Metadata } from "next";
import "@/sass/index.css";

export const metadata: Metadata = {
  title: "Mart POS",
  description: "Mart POS",
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
