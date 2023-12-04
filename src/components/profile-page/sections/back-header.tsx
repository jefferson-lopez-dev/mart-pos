"use client";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackHeader() {
  const { push } = useRouter();

  return (
    <div className="px-2 w-full h-[50px] flex items-center">
      <ChevronLeftIcon onClick={() => push("/")} />
      <h1 className="text-base opacity-90 ">Profile</h1>
    </div>
  );
}
