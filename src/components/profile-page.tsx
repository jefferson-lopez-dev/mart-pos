"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useProfile } from "@/hooks/use-profile";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

interface PropsInputDataEdit {
  label: string;
  data: string;
  sudmitData?: (data: object) => void;
  registerInput?: string;
  editData?: boolean;
  dialogDescription?: string;
  dialogTitle?: string;
}

function credsData(data: string) {
  const noDataText = "No specifications";
  return !data ? noDataText : data;
}

export function InputDataEdit({
  label,
  data,
  sudmitData,
  editData = true,
  registerInput = "",
  dialogDescription = "",
  dialogTitle,
}: PropsInputDataEdit) {
  const { handleSubmit, register, setValue } = useForm();
  useEffect(() => {
    setValue(registerInput, data);
  }, [data]);

  return (
    <>
      <div className="w-full sm:w-[500px] h-[50px] flex justify-between px-3 py-1 items-center  rounded-lg ">
        <div>
          <p className="opacity-50 text-[12px]">{label}</p>
          <p className="opacity-90 overflow-hidden text-ellipsis break-keep">
            {credsData(data)}
          </p>
        </div>
        {editData && (
          <Dialog>
            <DialogTrigger>
              <div className="w-[30px] h-[30px]  rounded-full bg-neutral-900 flex items-center justify-center">
                <PencilIcon className="opacity-50 cursor-pointer" size={18} />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">{dialogTitle}</DialogTitle>
                <DialogDescription className="opacity-80 text-sm">
                  {dialogDescription}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <form
                  className="flex w-full max-w-sm items-center space-x-2"
                  onSubmit={handleSubmit((data) => {
                    if (sudmitData !== undefined) {
                      sudmitData(data);
                    }
                  })}
                >
                  <Input
                    type="text"
                    placeholder={label}
                    {...register(registerInput)}
                  />
                  <DialogClose asChild>
                    <Button type="submit">Save changes</Button>
                  </DialogClose>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}

export function ProfilePage() {
  const {
    data: { picture, country, createdAt, email, fullname },
    getProfile,
    updateProfile,
    inputFileRef,
    handleFileChange,
    handleImageClick,
    handleImageLoad,
    onLoadImg,
  } = useProfile();
  const { push } = useRouter();

  useEffect(() => {
    getProfile();
  }, []);

  const not_picture_url =
    "https://res.cloudinary.com/jeffersoncloud/image/upload/v1701628837/photos/e9fqfyuthrjjo9ojcw6p.jpg";

  return (
    <div>
      <input
        accept="image/*"
        type="file"
        style={{ display: "none" }}
        ref={inputFileRef}
        onChange={handleFileChange}
      />
      <div className="px-2 w-full h-[50px] flex items-center">
        <ChevronLeftIcon onClick={() => push("/")} />
        <h1 className="text-base opacity-90 ">Profile</h1>
      </div>
      <div className="w-full h-[300px] gap-3 flex flex-col justify-center items-center">
        {!onLoadImg && (
          <Skeleton className="w-[180px] h-[180px] rounded-full" />
        )}
        <img
          onClick={handleImageClick}
          className={`rounded-full w-[180px] h-[180px] cursor-pointer ${
            onLoadImg ? "" : "hidden"
          }`}
          width={150}
          src={!picture.status ? not_picture_url : picture.url}
          alt="asdas"
          onLoad={handleImageLoad}
        />
        {!createdAt ? (
          <Skeleton className="w-[100px] h-[20px]" />
        ) : (
          <Badge variant="outline">{createdAt}</Badge>
        )}
        {!fullname ? (
          <Skeleton className="w-[300px] h-[30px]" />
        ) : (
          <p className="text-3xl w-[95%] sm:w-[500px] whitespace-nowrap overflow-hidden text-ellipsis text-center capitalize">
            {credsData(fullname)}
          </p>
        )}
      </div>
      <div className="w-full pt-5 h-3/4 gap-3 flex flex-col items-center">
        <InputDataEdit
          label="Full Name"
          data={fullname}
          registerInput="fullname"
          dialogTitle="Full Name"
          dialogDescription="This information will be public"
          sudmitData={(data) => updateProfile(data)}
        />
        <InputDataEdit
          label="Email"
          data={email}
          registerInput="email"
          dialogTitle="Email"
          dialogDescription="This email is public"
          sudmitData={(data) => updateProfile(data)}
        />
        <InputDataEdit
          label="Country"
          data={country}
          registerInput="country"
          dialogTitle="Country"
          dialogDescription="This information will be public"
          sudmitData={(data) => updateProfile(data)}
        />
      </div>
    </div>
  );
}
