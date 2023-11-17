import type { Metadata } from "next";
import { MartPosProvider } from "@/context";
import "@/sass/index.css";

export const metadata: Metadata = {
  title: "Mart POS",
  description: "Mart POS",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <MartPosProvider>{children}</MartPosProvider>
      </body>
    </html>
  );
}
