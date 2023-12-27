import { Metadata } from "next";
import { children } from "@/interface";

export const metadata: Metadata = {
  title: "Inventory - Mart",
  description: "Mart POS",
};

export default function Metadata({ children }: children) {
  return children;
}
