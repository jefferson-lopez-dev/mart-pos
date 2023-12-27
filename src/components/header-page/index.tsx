"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { MainNav } from "./main-nav";
import { Search } from "./search";
import { UserNav } from "./user-nav";
import Image from "next/image";

export function HeaderPage() {
  const { push } = useRouter();
  const { theme, systemTheme } = useTheme();
  const [logo, setLogo] = useState("/mart-light.png");

  useEffect(() => {
    function logoMart() {
      if (theme === "dark" || systemTheme === "dark")
        setLogo("/mart-light.png");

      if (theme === "light" || systemTheme === "light")
        setLogo("/mart-dark.png");
    }
    logoMart();
  }, [theme, systemTheme]);

  return (
    <div className="border-b pb-1 sticky top-0  bg-inherit z-10">
      <div className="h-[10dvh] bg-inherit flex items-center w-full overflow-hidden">
        <div className="flex h-[80px] w-full flex-col justify-around">
          <div className="flex w-full px-2">
            <Image
              className="h-[30px] w-[30px] cursor-pointer"
              onClick={() => push("/")}
              src={logo}
              alt="photo"
              width={35}
              height={35}
            />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full px-2 h-[30px]  bg-inherit">
        <MainNav className="" />
      </div>
    </div>
  );
}
