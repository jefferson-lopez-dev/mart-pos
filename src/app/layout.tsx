import type { Metadata } from "next";
import { MartPosProvider } from "@/context";
import "@/sass/index.css";
import { children } from "@/interface";

export const metadata: Metadata = {
  title: "Mart POS",
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
