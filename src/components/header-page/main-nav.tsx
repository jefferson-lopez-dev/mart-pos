import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pn = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Button size="sm" asChild>
        <Link
          href="/"
          className={`break-normal text-sm font-medium ${
            pn !== "/" && "text-muted-foreground"
          } transition-colors`}
        >
          Check in
        </Link>
      </Button>
      <Link
        href="/"
        className={`break-normal text-sm font-medium ${
          pn !== "/Overview" && "text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Overview
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
        href="/"
        className={`break-normal text-sm font-medium ${
          pn !== "/inventory" && "text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Inventory
      </Link>
      <Link
        href="/settings"
        className={`break-normal text-sm font-medium ${
          pn !== "/Settings" && "text-muted-foreground"
        } transition-colors hover:text-primary`}
      >
        Settings
      </Link>
    </nav>
  );
}
