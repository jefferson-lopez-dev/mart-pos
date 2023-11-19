"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function Logo() {
  const { theme, systemTheme } = useTheme();
  const { push } = useRouter();
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
    <Image
      className="cursor-pointer absolute left-4 top-4"
      onClick={() => push("/")}
      src={logo}
      alt="photo"
      width={35}
      height={35}
    />
  );
}
