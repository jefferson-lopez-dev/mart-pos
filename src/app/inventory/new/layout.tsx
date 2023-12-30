import { Metadata } from "next";
import { children } from "@/interface";

export const metadata: Metadata = {
  title: "New Inventory",
  description: "Mart POS",
};

export default function Metadata({ children }: children) {
  return children;
}
