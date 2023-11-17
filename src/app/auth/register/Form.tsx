"use client";
import { useForm } from "react-hook-form";
import { apiRegister } from "@/api";
import Link from "next/link";

function navigateRute(newPathname: string = "/") {
  const currentOrigin = window.location.origin;
  const newURL = currentOrigin + newPathname;
  window.location.href = newURL;
}

export function Form() {
  const { register, handleSubmit } = useForm();
  return (
    <center>
      <h1>Mart</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await apiRegister(data);
          console.log(res.data);
          if (res.data.status === 204) navigateRute();
        })}
      >
        <input type="gmail" {...register("gmail")} />
        <br />
        <input type="password" {...register("password")} />
        <br />
        <button type="submit">Register</button>
        <Link href={"/auth/login"}>sign in</Link>
      </form>
    </center>
  );
}
