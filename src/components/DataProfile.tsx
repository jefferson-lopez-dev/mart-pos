/* eslint-disable @next/next/no-img-element */
"use client";
import { useProfile } from "@/hooks/use-profile";
import { useEffect } from "react";

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
  const { data, getProfile, inputFileRef, handleFileChange, handleImageClick } =
    useProfile();

  useEffect(() => {
    async function fetchData() {
      await getProfile();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <div>
          <img
            onClick={handleImageClick}
            width={50}
            height={50}
            alt="photo"
            src={data?.profile_picture?.url}
          />
        </div>
        <button className="flex items-center" onClick={handleImageClick}>
          Upload Photo
        </button>

        <Data data={data.fullName} name="name"></Data>
        <Data data={data.email} name="email"></Data>
        <Data data={data.age + " years"} name="age"></Data>
        <Data data={data.country} name="country"></Data>
      </div>
      <br />
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
