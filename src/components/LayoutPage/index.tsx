import { children } from "@/interface";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";

export function LayoutPage({ children }: children) {
  return (
    <div className="w-full flex justify-center">
      <ScrollArea className="w-full max-w-[730px] flex justify-center h-[87dvh]">
        <div>{children}</div>
      </ScrollArea>
    </div>
  );
}
