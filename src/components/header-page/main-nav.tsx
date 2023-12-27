import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pn = usePathname();

  return (
    <ScrollArea className="w-full">
      <nav className={cn("flex items-center space-x-6", className)} {...props}>
        <Link
          href="/"
          className={`break-normal whitespace-nowrap text-sm font-medium ${
            pn !== "/" && "text-muted-foreground"
          } transition-colors hover:text-primary`}
        >
          Check In
        </Link>
        <Link
          href="/"
          className={`break-normal text-sm font-medium ${
            pn !== "/sales" && "text-muted-foreground"
          } transition-colors hover:text-primary`}
        >
          Dashboard
        </Link>
        <Link
          href="/"
          className={`break-normal text-sm font-medium ${
            pn !== "/sales" && "text-muted-foreground"
          } transition-colors hover:text-primary`}
        >
          Sales
        </Link>
        <Link
          href="/inventory"
          className={`break-normal text-sm font-medium ${
            pn !== "/inventory" && "text-muted-foreground"
          } transition-colors hover:text-primary`}
        >
          Inventory
        </Link>
        <Link
          href="/"
          className={`break-normal text-sm font-medium ${
            pn !== "/Overview" && "text-muted-foreground"
          } transition-colors hover:text-primary`}
        >
          Folders
        </Link>
        <Link
          href="/"
          className={`break-normal text-sm font-medium ${
            pn !== "/Overview" && "text-muted-foreground"
          } transition-colors hover:text-primary`}
        >
          Products
        </Link>
        <Link
          href="/settings"
          className={`break-normal text-sm font-medium ${
            pn !== "/settings" && "text-muted-foreground"
          } transition-colors hover:text-primary`}
        >
          Settings
        </Link>
      </nav>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
