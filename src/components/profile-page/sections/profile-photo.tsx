"use client";
import Image from "next/image";
import { Skeleton } from "../../ui/skeleton";
import { useProfile } from "@/hooks/use-profile";
import { not_picture_url } from "../common/__constans";
import { credsData } from "../common/__functions";
import { Badge } from "../../ui/badge";

function Picture() {
  const {
    data: {
      picture: { status, url },
    },
    handleImageClick,
    handleImageLoad,
    onLoadImg,
    inputFileRef,
    handleFileChange,
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
      {!onLoadImg && <Skeleton className="w-[180px] h-[180px] rounded-full" />}
      <Image
        onClick={handleImageClick}
        className={`rounded-full w-[180px] h-[180px] cursor-pointer ${
          onLoadImg ? "" : "hidden"
        }`}
        width={150}
        height={150}
        src={!status ? not_picture_url : url}
        alt="asdas"
        onLoad={handleImageLoad}
      />
    </>
  );
}

function Fullname() {
  const { data } = useProfile();
  const skeleton = <Skeleton className="w-[300px] h-[30px]" />;
  const textFullname = (
    <p className="text-3xl w-[95%] sm:w-[500px] whitespace-nowrap overflow-hidden text-ellipsis text-center capitalize">
      {credsData(data.fullname)}
    </p>
  );

  return !data.fullname ? skeleton : textFullname;
}

function CreatedAt() {
  const { data } = useProfile();

  const skeleton = <Skeleton className="w-[100px] h-[20px]" />;
  const badge = <Badge variant="outline">{data.createdAt}</Badge>;

  return !data.createdAt ? skeleton : badge;
}

export function ProfilePhoto() {
  return (
    <div className="w-full h-[300px] gap-3 flex flex-col justify-center items-center">
      <Picture />
      <CreatedAt />
      <Fullname />
    </div>
  );
}
