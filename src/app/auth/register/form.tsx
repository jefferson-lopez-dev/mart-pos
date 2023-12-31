"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormRegister({ className, ...props }: UserAuthFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { signUpCredentials } = useAuth();
  const { push } = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (data: any) => {
    setLoading(true);
    const resonseSignUp = await signUpCredentials(data);

    if (resonseSignUp.status === 409) {
      setLoading(false);
      toast({
        title: `${resonseSignUp.message}`,
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }

    if (resonseSignUp.status === 204) {
      toast({
        title: `${resonseSignUp.message}`,
        description: "Sing In your account",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setLoading(false);
      toast({
        title: res?.error,
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      return;
    }
    if (res?.ok) return push("/");
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(handleSignUp)}>
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
                {...register("email")}
              />
            </div>
            <div>
              <Label htmlFor="email">Password</Label>
              <Input
                placeholder="**********"
                type="password"
                {...register("password")}
              />
            </div>
          </div>
          <br />
          <Button disabled={loading} size="lg" variant="default" type="submit">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or register with
          </span>
        </div>
      </div>
      <Button
        size="lg"
        onClick={async () => {
          await signIn("google", {
            redirect: false,
          });
          push("/");
        }}
        className="gap-2"
        variant="outline"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="23"
          height="23"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          ></path>
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          ></path>
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          ></path>
        </svg>
        Register with Google
      </Button>
    </div>
  );
}
