"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { register, handleSubmit } = useForm();
  const { signUpCredentials } = useAuth();
  const { push } = useRouter();

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form
        onSubmit={handleSubmit(async (data) => {
          const { email } = await signUpCredentials(data);
          const res = await signIn("credentials", {
            email: email,
            password: data.password,
            redirect: false,
          });
          console.log(res);
          if (res?.error) return console.log("error");
          if (res?.ok) return push("/");
        })}
      >
        <div className="grid gap-2">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                placeholder="your name completed"
                type="fullname"
                {...register("fullname")}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                {...register("email")}
              />
            </div>
            <div>
              <Label htmlFor="email">Password</Label>
              <Input
                placeholder="**********"
                type="password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                {...register("password")}
              />
            </div>
          </div>
          <br />
          <Button type="submit">Create Account</Button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button">
        <Github className="mr-2 h-4 w-4" />
        Github
      </Button> */}
    </div>
  );
}
