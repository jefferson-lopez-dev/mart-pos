import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Laptop2, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export function FooterPage() {
  const { theme, systemTheme, setTheme, themes } = useTheme();
  const { push } = useRouter();
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
          setLogo("/mart-dark.png");
          break;
        case systemTheme === "dark":
          setLogo("/mart-light.png");
          break;
        default:
          setLogo("/default-logo.png");
          break;
      }
    }

    setLogoBasedOnTheme();
  }, [theme, systemTheme]);

  return (
    <div className="flex w-full justify-center h-[100px] items-center border-t">
      <div className="flex w-full max-w-[730px] justify-between">
        <div className="flex items-center pl-3">
          <Image
            className="h-[30px] w-[30px] cursor-pointer"
            onClick={() => push("/")}
            src={logo}
            alt="photo"
            width={35}
            height={35}
          />
          <p className="text-mart text-[30px]">MART</p>
        </div>
        <div className="flex gap-1 items-center pr-3">
          <Button
            onClick={() => setTheme("light")}
            variant="ghost"
            className="rounded-full p-[10px]"
          >
            <Sun className="icon2" />
          </Button>
          <Button
            onClick={() => setTheme("dark")}
            variant="ghost"
            className="rounded-full p-[10px]"
          >
            <Moon className="icon2" />
          </Button>
          <Button
            onClick={() => setTheme("system")}
            variant="ghost"
            className="rounded-full p-[10px]"
          >
            <Laptop2 className="icon2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
