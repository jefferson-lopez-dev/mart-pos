"use client";
import { DataProfile } from "@/components/DataProfile";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <div>
      <Link href={"/"}>back</Link>
      <br />
      <DataProfile />
    </div>
  );
}
