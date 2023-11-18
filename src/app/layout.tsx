import { MartPosProvider } from "@/context";
import { children } from "@/interface";
import type { Metadata } from "next";
import "@/sass/index.css";
import "@/sass/tailwind.css";

export const metadata: Metadata = {
  title: "Mart",
  description: "Mart POS",
};

export default function RootLayout({ children }: children) {
  return (
    <html lang="en">
      <body>
        <MartPosProvider>{children}</MartPosProvider>
      </body>
    </html>
  );
}
