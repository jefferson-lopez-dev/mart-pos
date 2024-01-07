"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/use-profile";
import { useSession, signOut } from "next-auth/react";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import * as IconLucide from "lucide-react";
import { useRouter } from "next/navigation";

interface typeButtonSheetMart {
  icon?: keyof typeof IconLucide;
  text?: string;
  route?: {
    render?: boolean;
    value?: string;
  };
  click?: {
    render?: boolean;
    logic?: () => void;
  };
}

const buttonsSheetMart: typeButtonSheetMart[][] = [
  [
    {
      icon: "Receipt",
      text: "Sell Product",
      route: {
        render: true,
        value: "/",
      },
    },
    {
      icon: "LayoutDashboard",
      text: "Dashboard",
      route: {
        render: true,
        value: "/",
      },
    },
    {
      icon: "Box",
      text: "Inventory",
      route: {
        render: true,
        value: "/inventory",
      },
    },
    {
      icon: "Settings",
      text: "Settings",
      route: {
        render: true,
        value: "/settings",
      },
    },
  ],
  [
    {
      icon: "History",
      text: "History Sales",
      route: {
        render: true,
        value: "/",
      },
    },
    {
      icon: "Folder",
      text: "Folders",
      route: {
        render: true,
        value: "/",
      },
    },
    {
      icon: "StretchHorizontal",
      text: "Products",
      route: {
        render: true,
        value: "/",
      },
    },
  ],
  [
    {
      icon: "LogOut",
      text: "Log out",
      click: {
        render: true,
        logic: () => {
          signOut();
        },
      },
    },
  ],
];

export function UserNav() {
  const {
    data: { picture, fullname },
  } = useProfile();
  const { data: session }: any = useSession();
  const { push } = useRouter();
  const not_picture_url =
    "https://res.cloudinary.com/jeffersoncloud/image/upload/v1701628837/photos/e9fqfyuthrjjo9ojcw6p.jpg";

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={!picture.url ? not_picture_url : picture.url}
                alt="@martpos"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="pb-3">
            <SheetTitle>
              <div className="w-full flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={!picture.url ? not_picture_url : picture.url}
                    alt="@martpos"
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <div className="w-full flex flex-col items-start">
                  <span className="w-[250px] text-start text-ellipsis whitespace-nowrap overflow-hidden text-2xl">
                    {fullname}
                  </span>
                  <div className="w-[250px] text-ellipsis whitespace-nowrap overflow-hidden text-start text-sm text-neutral-500 font-medium">
                    {session?.user?.email}
                  </div>
                </div>
              </div>
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <Separator />
          <div className="w-full flex flex-col py-3">
            {buttonsSheetMart[0].map((button, i) => {
              const IconComponent =
                button.icon && (IconLucide[button.icon] as any);
              return (
                <Button
                  asChild
                  key={i}
                  variant="ghost"
                  className="w-full justify-start flex gap-2"
                  onClick={() => {
                    if (button.route?.render) {
                      push(button.route.value ? button.route.value : "/");
                    }
                    if (button.click?.render) {
                      button.click.logic ? button.click.logic() : () => {};
                    }
                  }}
                >
                  <SheetClose className="w-full flex items-center gap-2 ">
                    <IconComponent className="text-neutral-500" size={20} />
                    <span>{button.text}</span>
                  </SheetClose>
                </Button>
              );
            })}
          </div>
          <Separator />
          <div className="w-full flex flex-col py-3">
            {buttonsSheetMart[1].map((button, i) => {
              const IconComponent =
                button.icon && (IconLucide[button.icon] as any);
              return (
                <Button
                  asChild
                  key={i}
                  variant="ghost"
                  className="w-full justify-start flex gap-2"
                  onClick={() => {
                    if (button.route?.render) {
                      push(button.route.value ? button.route.value : "/");
                    }
                    if (button.click?.render) {
                      button.click.logic ? button.click.logic() : () => {};
                    }
                  }}
                >
                  <SheetClose className="w-full flex items-center gap-2 ">
                    <IconComponent className="text-neutral-500" size={20} />
                    <span>{button.text}</span>
                  </SheetClose>
                </Button>
              );
            })}
          </div>
          <Separator />
          <div className="w-full flex flex-col py-3">
            {buttonsSheetMart[2].map((button, i) => {
              const IconComponent =
                button.icon && (IconLucide[button.icon] as any);
              return (
                <Button
                  asChild
                  key={i}
                  variant="ghost"
                  className="w-full justify-start flex gap-2"
                  onClick={() => {
                    if (button.route?.render) {
                      push(button.route.value ? button.route.value : "/");
                    }
                    if (button.click?.render) {
                      button.click.logic ? button.click.logic() : () => {};
                    }
                  }}
                >
                  <SheetClose className="w-full flex items-center gap-2 ">
                    <IconComponent className="text-neutral-500" size={20} />
                    <span>{button.text}</span>
                  </SheetClose>
                </Button>
              );
            })}
          </div>
          <Separator />
          <div className="w-full flex flex-col py-3">
            <Button variant="default" className="w-full">
              <span>Subscription</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
