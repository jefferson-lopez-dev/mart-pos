"use client";
import Link from "next/link";
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
import {
  Box,
  LogOut,
  Settings,
  LayoutDashboard,
  BadgeDollarSign,
  Receipt,
  Folder,
  StretchHorizontal,
} from "lucide-react";

export function UserNav() {
  const {
    data: { picture, fullname },
  } = useProfile();
  const { data: session }: any = useSession();
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
          <SheetHeader>
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
          <br />
          <Separator />
          <br />
          <div className="w-full flex flex-col">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start flex gap-2"
              >
                <SheetClose className="w-full flex items-center gap-2 ">
                  <Receipt className="text-neutral-500" size={20} />
                  <span>Check in</span>
                </SheetClose>
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start flex gap-2"
              >
                <SheetClose className="w-full flex items-center gap-2 ">
                  <LayoutDashboard className="text-neutral-500" size={20} />
                  <span>Dashboard</span>
                </SheetClose>
              </Button>
            </Link>
            <Link href="/inventory">
              <Button
                variant="ghost"
                className="w-full justify-start flex gap-2"
              >
                <SheetClose className="w-full flex items-center gap-2 ">
                  <Box className="text-neutral-500" size={20} />
                  <span>Inventory</span>
                </SheetClose>
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" className="w-full justify-start flex">
                <SheetClose className="w-full flex items-center gap-2 ">
                  <Settings className="text-neutral-500" size={20} />
                  <span>Settings</span>
                </SheetClose>
              </Button>
            </Link>
          </div>
          <br />
          <Separator />
          <br />
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start flex gap-2">
              <SheetClose className="w-full flex items-center gap-2 ">
                <BadgeDollarSign className="text-neutral-500" size={20} />
                <span>Sales</span>
              </SheetClose>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start flex gap-2">
              <SheetClose className="w-full flex items-center gap-2 ">
                <Folder className="text-neutral-500" size={20} />
                <span>Folders</span>
              </SheetClose>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start flex gap-2">
              <SheetClose className="w-full flex items-center gap-2 ">
                <StretchHorizontal className="text-neutral-500" size={20} />
                <span>Products</span>
              </SheetClose>
            </Button>
          </Link>
          <br />
          <Separator />
          <br />
          <div className="w-full flex flex-col">
            <Button
              onClick={() => {
                signOut();
              }}
              variant="default"
              className="w-full justify-start flex gap-2"
            >
              <LogOut className="text-neutral-500" size={20} />
              <span>Log out</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
