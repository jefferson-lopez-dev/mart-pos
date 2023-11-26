import Link from "next/link";
import { Metadata } from "next";
import { FormLogin } from "./form";
import { HeaderAuth } from "@/components/header-auth";

export const metadata: Metadata = {
  title: "Mart Login",
  description: "Sign in to your mart account",
};

export default function LoginAuth() {
  return (
    <div className="container h-[100dvh] flex-col items-center justify-center md:grid lg:px-0">
      <HeaderAuth urlLink="/auth/register" buttonText="Create an Account" />
      <div className="h-full flex items-center justify-between">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Log in to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enjoy infinite possibilities in <span translate="no">Mart</span>.
            </p>
          </div>
          <FormLogin />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:underline underline-offset-4"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
