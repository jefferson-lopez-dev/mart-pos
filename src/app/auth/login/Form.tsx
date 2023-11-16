"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";

function navigateRute(newPathname: string = "/") {
  const currentOrigin = window.location.origin;
  const newURL = currentOrigin + newPathname;
  window.location.href = newURL;
}

export function Form() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  return (
    <center>
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await login(data);
          if (res.status === 204) navigateRute();
        })}
      >
        <input type="text" {...register("gmail")} />
        <br />
        <input type="password" {...register("password")} />
        <br />
        <button type="submit">Login</button>
      </form>
    </center>
  );
}
