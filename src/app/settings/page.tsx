"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/use-profile";
import { Loader2, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Picture() {
  const {
    data: {
      picture: { url, status },
    },
    handleImageClick,
    inputFileRef,
    handleFileChange,
  } = useProfile();
  return (
    <>
      <input
        accept="image/*"
        type="file"
        hidden
        style={{ display: "none" }}
        ref={inputFileRef}
        onChange={handleFileChange}
      />
      {!status && (
        <div className="w-[90px] h-[90px]">
          <Skeleton className="rounded-full w-[80px] h-[80px] cursor-pointer" />
        </div>
      )}
      {status && (
        <div className="w-[90px] h-[90px] ">
          <Image
            onClick={handleImageClick}
            className={`rounded-full w-[80px] h-[80px] cursor-pointer`}
            width={80}
            height={80}
            src={url}
            alt="@martpos"
            priority={true}
          />
        </div>
      )}
    </>
  );
}

export default function Settings() {
  const [updateFullName, setUpdateFullName] = useState(false);
  const { handleSubmit, register, setValue } = useForm();
  const {
    data: { country, email, fullname },
    updateProfile,
  } = useProfile();

  useEffect(() => {
    setValue("fullname", fullname);
  }, [fullname, setValue]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[730px] px-3 h-[100px] flex items-center">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      {/* <div className="w-full border-b" /> */}
      <div className="w-full flex flex-col items-center p-3">
        <div className="border w-full max-w-[700px] rounded-lg">
          <div className="h-[120px] flex justify-between items-center">
            <div className="px-5">
              <h2 className="text-xl h-[40px] font-semibold">Picture</h2>
              <p className="text-sm">
                Click on the picture to upload a custom one from your files.
              </p>
            </div>
            <div>
              <Picture />
            </div>
          </div>
          <div className="w-full border-b" />
          <div className="h-[50px] flex items-center justify-center">
            <p className="opacity-70 text-sm">
              An picture is optional but strongly recommended.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            setUpdateFullName(true);
            const res = await updateProfile(data);
            if (res.status === 200) {
              setUpdateFullName(false);
            }
          })}
          className="border w-full max-w-[700px] rounded-lg my-10"
        >
          <div className="h-[200px] flex justify-between items-center">
            <div className="px-5">
              <h2 className="text-xl h-[40px] font-semibold">Full Name</h2>
              <p className="text-sm">
                Please enter your full name, or a display name you are
                comfortable with.
              </p>
              <br />
              <div className="flex gap-9">
                <Input
                  className="w-[300px]"
                  type="text"
                  {...register("fullname")}
                />
                <Button
                  className="w-[100px]"
                  disabled={updateFullName}
                  variant="default"
                  type="submit"
                >
                  {updateFullName && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
