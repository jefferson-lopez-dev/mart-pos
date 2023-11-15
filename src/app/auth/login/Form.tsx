"use client";
import { useForm } from "react-hook-form";
import { apiLogin } from "@/api";

function navigateRute(newPathname: string = "/") {
  const currentOrigin = window.location.origin;
  const newURL = currentOrigin + newPathname;
  window.location.href = newURL;
}

export function Form() {
  const { register, handleSubmit } = useForm();
  return (
    <center>
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await apiLogin(data);
          if (res.data.status === 204) navigateRute();
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
