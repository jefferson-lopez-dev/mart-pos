/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useProfile } from "@/hooks/use-profile";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export function ProfilePage() {
  const [userIdSession, setUserIdSession] = useState<number>();
  const { getProfile, data: creds } = useProfile();
  const { data: session }: any = useSession();

  useEffect(() => {
    setUserIdSession(session?.user?._id);
  }, [session]);

  useEffect(() => {
    async function name() {
      if (userIdSession !== undefined) {
        await getProfile(userIdSession);
      }
    }
    name();
  }, [userIdSession]);

  console.log(creds);

  return <div>profile-page</div>;
}
