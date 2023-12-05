"use client";
import Image from "next/image";
import { Skeleton } from "../../ui/skeleton";
import { useProfile } from "@/hooks/use-profile";
import { credsData } from "../common/__functions";
import { Badge } from "../../ui/badge";
import { TrashIcon } from "lucide-react";
import { not_picture_url } from "../common";

function Picture() {
  const {
    data: {
      picture: { url, status },
    },
    handleImageClick,
    inputFileRef,
    handleFileChange,
    onLoadImg,
    deletePhoto,
  } = useProfile();
  return (
    <>
      <input
        accept="image/*"
        type="file"
        style={{ display: "none" }}
        ref={inputFileRef}
        onChange={handleFileChange}
      />
      {!status && (
        <div className="flex flex-col items-end ">
          <div className="w-[34px] h-[34px]" />
          <Skeleton className="w-[180px] h-[180px] rounded-full" />
        </div>
      )}
      {status && (
        <div className={`flex flex-col items-end`}>
          <button
            onClick={() => {
              deletePhoto();
            }}
            className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-neutral-800 border border-neutral-500 relative top-12 active:bg-red-900  active:border-red-500"
          >
            <TrashIcon
              className="text-neutral-200 active:text-red-200"
              size={18}
            />
          </button>
          <Image
            onClick={handleImageClick}
            className={`rounded-full w-[180px] h-[180px] cursor-pointer`}
            width={150}
            height={150}
            src={url}
            alt="@martpos"
            priority={true}
          />
        </div>
      )}
    </>
  );
}

function Fullname() {
  const { data } = useProfile();
  const skeleton = <Skeleton className="w-[300px] h-[35px]" />;
  const textFullname = (
    <p className="text-3xl h-[35px] w-[95%] sm:w-[500px] whitespace-nowrap overflow-hidden text-ellipsis text-center capitalize">
      {credsData(data.fullname)}
    </p>
  );

  return !data.fullname ? skeleton : textFullname;
}

function CreatedAt() {
  const { data } = useProfile();

  const skeleton = <Skeleton className="w-[100px] h-[21px]" />;
  const badge = <Badge variant="secondary">{data.createdAt}</Badge>;

  return !data.createdAt ? skeleton : badge;
}

export function ProfilePhoto() {
  return (
    <div className="w-full h-[300px] gap-3 flex flex-col justify-center items-center">
      <Picture />
      <Fullname />
      <CreatedAt />
    </div>
  );
}
