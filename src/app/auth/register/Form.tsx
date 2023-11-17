"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";
import Link from "next/link";
import { useState } from "react";

export function Form() {
  const { register, handleSubmit } = useForm();
  const [responseResgister, setResponseResgister] = useState<any>({});
  const createAccount = useAuth().register;

  return (
    <center>
      <h1>Mart</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await createAccount(data);
          setResponseResgister(res);
        })}
      >
        <input type="gmail" {...register("gmail")} />
        <br />
        <input type="password" {...register("password")} />
        <br />
        <button type="submit">Register</button>
        <Link href={"/auth/login"}>sign in</Link>
      </form>
      <p>{responseResgister.error}</p>
    </center>
  );
}
