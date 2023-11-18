/* eslint-disable @next/next/no-img-element */
"use client";
import { useProfile } from "@/hooks/use-profile";
import { Button, Avatar, Input } from "@nextui-org/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ImageIcon } from "@radix-ui/react-icons";

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
  const {
    data,
    getProfile,
    updateProfile,
    inputFileRef,
    handleFileChange,
    handleImageClick,
  } = useProfile();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    async function fetchData() {
      await getProfile();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initializeProfileForm() {
    setValue("name", data.name);
    setValue("last_name", data.lastname);
    setValue("country", data.country);
    setValue("age", data.age);
    setValue("email", data.email);
  }

  useEffect(() => {
    initializeProfileForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <Avatar
          onClick={handleImageClick}
          className="cursor-pointer"
          src={data?.profile_picture?.url}
          size="md"
          radius="md"
          isBordered
          color="primary"
        />
        <Button
          onClick={handleImageClick}
          size="sm"
          color="primary"
          endContent={<ImageIcon />}
        >
          Upload photo
        </Button>
        <Data data={data.fullName} name="name"></Data>
        <Data data={data.email} name="email"></Data>
        <Data data={data.age + " years"} name="age"></Data>
        <Data data={data.country} name="country"></Data>
      </div>
      <br />
      <h2>Update Profile Data</h2>
      <form
        style={{
          width: "300px",
        }}
        className="w-[300px]"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          updateProfile({ ...data, age: Number(data.age) });
        })}
      >
        <Input
          size="sm"
          type="text"
          label="Name"
          placeholder={data.name}
          defaultValue={data.name}
          {...register("name")}
        />
        <Input
          size="sm"
          type="text"
          label="Last name"
          placeholder={data.lastname}
          defaultValue={data.lastname}
          {...register("last_name")}
        />
        <Input
          size="sm"
          type="text"
          label="Country"
          placeholder={data.country}
          defaultValue={data.country}
          {...register("country")}
        />
        <Input
          size="sm"
          type="number"
          label="Age"
          placeholder={data.age}
          defaultValue={data.age}
          {...register("age")}
        />
        <Input
          size="sm"
          type="Email"
          label="Email"
          placeholder={data.email}
          defaultValue={data.email}
          {...register("email")}
        />
        <Button type="submit" size="sm" color="success">
          Save
        </Button>
      </form>
      <input
        accept="image/*"
        type="file"
        capture="environment"
        style={{ display: "none" }}
        ref={inputFileRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
