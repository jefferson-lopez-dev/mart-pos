"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";
import Link from "next/link";
import { useState } from "react";

export function Form() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const [responseLogin, setResponseLogin] = useState<any>({});

  const handleLogin = async (data: object) => {
    const res = await login(data);
    setResponseLogin(res);
  };

  console.log();

  return (
    <center>
      <h1>Mart</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input type="text" {...register("gmail")} />
        <br />
        <input type="password" {...register("password")} />
        <br />
        <button type="submit">Login</button>
        <Link href={"/auth/register"}>Create Account</Link>
      </form>
      <p>{responseLogin.error}</p>
    </center>
  );
}
