"use client";
import { useProfile } from "@/hooks/use-profile";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export function ProfilePage() {
  const [dataCredsProfile, setDataCredsProfile] = useState({});
  const [userIdSession, setUserIdSession] = useState<number>();
  const { getProfile } = useProfile();
  const { data: session }: any = useSession();

  useEffect(() => {
    setUserIdSession(session?.user?._id);
  }, [session]);

  useEffect(() => {
    async function name() {
      if (userIdSession !== undefined) {
        const data = await getProfile("asdasd");
        setDataCredsProfile(data);
      }
    }
    name();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdSession]);

  console.log(dataCredsProfile);
  console.log(session);

  return <div>profile-page</div>;
}
