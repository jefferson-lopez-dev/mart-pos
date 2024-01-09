"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfile } from "@/hooks/use-profile";
import { Loader2, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { ActionPanel } from "@/components/ActionPanel";
import { LayoutPage } from "@/components/LayoutPage";

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
  const [updateGmail, setUpdateGmail] = useState(false);
  const [updateCountry, setUpdateCountry] = useState(false);
  const { handleSubmit, register, setValue } = useForm();
  const { toast } = useToast();
  const {
    data: { country, email, fullname },
    updateProfile,
  } = useProfile();

  useEffect(() => {
    setValue("fullname", fullname);
    setValue("email", email);
    setValue("country", country);
  }, [fullname, setValue, email, country]);

  const loadingName =
    fullname === undefined ? "Loading..." : fullname === "" ? "Name" : fullname;
  const loadingGmail =
    fullname === undefined ? "Loading..." : email === "" ? "Gmail" : email;
  const loadingCountry =
    fullname === undefined
      ? "Loading..."
      : country === ""
      ? "Country"
      : country;

  return (
    <div className="flex flex-col items-center">
      <ActionPanel
        title="Account Settings"
        description="Make the necessary account settings."
        keaworks={[
          { text: loadingName },
          { text: loadingGmail },
          { text: loadingCountry },
        ]}
        preferences={{
          buttonBack: {
            render: true,
            route: "/",
            text: "Home",
          },
          viewKeaworks: true,
        }}
      />
      <LayoutPage>
        <div className="w-full flex flex-col items-center p-3 gap-8">
          <div className="border w-full max-w-[700px] rounded-lg ">
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
            className="border w-full max-w-[700px] rounded-lg "
            onSubmit={handleSubmit(async (data) => {
              setUpdateFullName(true);
              const res = await updateProfile(data);
              if (res.status === 200) {
                setUpdateFullName(false);
                toast({ title: "Full Name updated" });
              }
            })}
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
                    type="text"
                    {...register("fullname", {
                      maxLength: 32,
                    })}
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
            <div className="w-full border-b" />
            <div className="h-[50px] flex items-center justify-center">
              <p className="opacity-70 text-sm">
                Please use 32 characters at maximum.
              </p>
            </div>
          </form>
          <form
            className="border w-full max-w-[700px] rounded-lg "
            onSubmit={handleSubmit(async (data) => {
              setUpdateGmail(true);
              const res = await updateProfile(data);
              if (res.status === 200) {
                setUpdateGmail(false);
                toast({ title: "Gmail updated" });
              }
            })}
          >
            <div className="h-[200px] flex justify-between items-center">
              <div className="px-5">
                <h2 className="text-xl h-[40px] font-semibold">
                  Display Gmail
                </h2>
                <p className="text-sm">
                  Please enter your Gmail address or a display name you are
                  comfortable with.
                </p>
                <br />
                <div className="flex gap-9">
                  <Input type="text" {...register("email")} />
                  <Button
                    className="w-[100px]"
                    disabled={updateGmail}
                    variant="default"
                    type="submit"
                  >
                    {updateGmail && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full border-b" />
            <div className="h-[50px] flex items-center justify-center">
              <p className="opacity-70 text-sm">Enter a valid gmail.</p>
            </div>
          </form>
          <form
            className="border w-full max-w-[700px] rounded-lg "
            onSubmit={handleSubmit(async (data) => {
              setUpdateCountry(true);
              const res = await updateProfile(data);
              if (res.status === 200) {
                setUpdateCountry(false);
                toast({ title: "Country updated" });
              }
            })}
          >
            <div className="h-[200px] flex justify-between items-center">
              <div className="px-5">
                <h2 className="text-xl h-[40px] font-semibold">Country</h2>
                <p className="text-sm">
                  Please select your country from the options below.
                </p>
                <br />
                <div className="flex gap-9 ">
                  <Input type="text" {...register("country")} />
                  <Button
                    className="w-[100px]"
                    disabled={updateCountry}
                    variant="default"
                    type="submit"
                  >
                    {updateCountry && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </LayoutPage>
    </div>
  );
}
