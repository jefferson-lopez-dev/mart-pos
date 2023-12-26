import { Metadata } from "next";
import { children } from "@/interface";

export const metadata: Metadata = {
  title: "Settings - Mart",
  description: "Mart POS",
};

export default function Metadata({ children }: children) {
  return children;
}
