import { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "./components/user-auth-form";
import { Logo } from "./components/logo-mart";
import { ModeToggle } from "@/components/theme/theme-mode";

export const metadata: Metadata = {
  title: "Mart Login",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="">
        <div className="container h-[100dvh] flex-col items-center justify-center md:grid lg:px-0">
          <Link
            href="/auth/register"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "absolute right-4 top-4"
            )}
          >
            Create an Account
          </Link>
          <Logo />

          <div className="h-full flex items-center justify-between">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Login in <span>Mart</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Explore your digital world! Log in for endless possibilities.
                </p>
              </div>
              <UserAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
