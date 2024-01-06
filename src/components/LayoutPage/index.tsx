import { children } from "@/interface";
import React from "react";

export function LayoutPage({ children }: children) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[730px] flex justify-center">{children}</div>
    </div>
  );
}
