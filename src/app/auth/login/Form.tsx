"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks";

export function Form() {
  const { push } = useRouter();
  const { register, handleSubmit } = useForm();
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async (data: object) => {
    await login(data);
  };

  return (
    <center>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input type="text" {...register("gmail")} />
        <br />
        <input type="password" {...register("password")} />
        <br />
        <button type="submit">Login</button>
      </form>
    </center>
  );
}
