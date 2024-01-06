import { children } from "@/interface";
import React from "react";

export function LayoutPage({ children }: children) {
  return (
    <div className="w-full flex justify-center pb-5">
      <div className="w-full max-w-[730px] flex justify-center flex-col">
        {children}
      </div>
    </div>
  );
}
