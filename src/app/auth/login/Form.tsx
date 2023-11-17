"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";
import Link from "next/link";

export function Form() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const handleLogin = async (data: object) => {
    await login(data);
  };

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
    </center>
  );
}
