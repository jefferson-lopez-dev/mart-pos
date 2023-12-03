"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useProfile } from "@/hooks/use-profile";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

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
      <div className="w-[300px] flex justify-between px-3 py-1 items-center  rounded-lg border border-neutral-900">
        <div>
          <p className="opacity-50 text-sm">{label}</p>
          <p className="opacity-90 w-[250px] overflow-hidden text-ellipsis">
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
    data: {
      picture: { url, status: statusImg },
      country,

      email,
      fullname,
    },
    updateProfile,
    inputFileRef,
    handleFileChange,
    handleImageClick,
  } = useProfile();
  const { push } = useRouter();
  const noPictureUrl =
    "https://i.pinimg.com/564x/2a/2e/7f/2a2e7f0f60b750dfb36c15c268d0118d.jpg";

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
      <div className="w-full h-[280px] gap-3 flex flex-col justify-center items-center">
        <img
          onClick={handleImageClick}
          className="rounded-full"
          width={150}
          src={statusImg ? url : noPictureUrl}
          alt="asdas"
        />
        <p className="text-3xl  text-center capitalize">
          {credsData(fullname)}
        </p>
        <Badge translate="no" variant="secondary">
          Mart Pos
        </Badge>
      </div>
      <div className="w-full h-3/4 gap-3 flex flex-col items-center">
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
