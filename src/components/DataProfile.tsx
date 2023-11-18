/* eslint-disable @next/next/no-img-element */
"use client";

import { useProfile } from "@/hooks/use-profile";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface PropsData {
  data: any;
  name: string;
}

function Data({ data, name }: PropsData) {
  return (
    <p>
      <strong>{name}:</strong> {data}
    </p>
  );
}

export function DataProfile() {
  const { data, getProfile, updateProfile } = useProfile();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    async function fetchData() {
      await getProfile();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue("name", data.name);
    setValue("last_name", data.lastname);
    setValue("country", data.country);
    setValue("age", data.age);
    setValue("city", data.city);
    setValue("email", data.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <h2>Information</h2>
      <div>
        <img
          width={30}
          height={30}
          src={data?.profile_picture?.url}
          alt="photo profile"
        />
        <br />
        <Data data={data.fullName} name="name"></Data>
        <Data data={data.email} name="email"></Data>
        <Data data={data.age + " years"} name="age"></Data>
        <Data data={data.city} name="city"></Data>
        <Data data={data.country} name="country"></Data>
      </div>
      <br />
      <h2>Update information</h2>
      <form
        onSubmit={handleSubmit((data) => {
          updateProfile({ ...data, age: Number(data.age) });
        })}
      >
        <div>
          <label>name</label>
          <br />
          <input type="text" {...register("name")} />
        </div>
        <div>
          <label>last name</label>
          <br />
          <input type="text" {...register("last_name")} />
        </div>
        <div>
          <label>country</label>
          <br />
          <input type="text" {...register("country")} />
        </div>
        <div>
          <label>age</label>
          <br />
          <input type="number" {...register("age")} />
        </div>
        <div>
          <label>city</label>
          <br />
          <input type="text" {...register("city")} />
        </div>
        <div>
          <label>email</label>
          <br />
          <input type="text" {...register("email")} />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
}
