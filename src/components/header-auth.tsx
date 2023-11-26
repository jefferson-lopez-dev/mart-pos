"use client";

import { cn } from "@/lib/utils";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

interface Props {
  buttonText: string;
  urlLink: string;
}

export function HeaderAuth({
  buttonText = "Text",
  urlLink = "/auth/login",
}: Props) {
  const { theme, systemTheme } = useTheme();
  const [logo, setLogo] = useState("");

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
    <>
      <Link
        href={`${urlLink}`}
        className={cn(
          buttonVariants({ variant: "default" }),
          "absolute right-4 top-4"
        )}
      >
        {buttonText}
      </Link>
      <Image
        className="cursor-pointer absolute left-4 top-4"
        src={logo ? logo : "/mart-light.png"}
        alt="photo"
        width={35}
        height={35}
      />
    </>
  );
}
