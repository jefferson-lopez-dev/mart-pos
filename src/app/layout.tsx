import { MartProvider } from "../Provider";
import { children } from "@/interface";
import type { Metadata } from "next";
import "@/sass/index.css";
import "@/sass/tailwind.css";

export const metadata: Metadata = {
  title: "Mart",
  description: "Mart POS",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon-mart.png",
    },
  ],
};

export default function RootLayout({ children }: children) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MartProvider>{children}</MartProvider>
      </body>
    </html>
  );
}
