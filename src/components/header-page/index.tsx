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
    function setLogoBasedOnTheme() {
      switch (true) {
        case theme === "dark":
          setLogo("/mart-light.png");
          break;
        case theme === "light":
          setLogo("/mart-dark.png");
          break;
        case systemTheme === "light":
        case systemTheme === "dark":
          setLogo("/mart-dark.png");
          break;
        default:
          setLogo("/default-logo.png");
          break;
      }
    }

    setLogoBasedOnTheme();
  }, [theme, systemTheme]);

  return (
    <header className="border-b sticky top-0 bg-inherit z-10">
      <div className="h-[9dvh] bg-inherit flex items-start w-full overflow-hidden">
        <div className="flex h-full w-full flex-col justify-around">
          <div className="flex w-full items-center px-2">
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
      <div className="flex w-full px-2 h-[40px]  bg-inherit">
        <MainNav className="" />
      </div>
    </header>
  );
}
