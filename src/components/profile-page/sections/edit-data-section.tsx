"use client";
import React from "react";
import { DataEditCard } from "../comps/data-edit-card";
import { useProfile } from "@/hooks/use-profile";

export function EditDataSection() {
  const {
    data: { country, email, fullname },
    updateProfile,
  } = useProfile();
  return (
    <div className="w-full pt-5 h-3/4 gap-3 flex flex-col items-center">
      <DataEditCard
        label="Full Name"
        data={fullname}
        registerInput="fullname"
        dialogTitle="Full Name"
        dialogDescription="This information will be public"
        sudmitData={(data) => updateProfile(data)}
      />
      <DataEditCard
        label="Email"
        data={email}
        registerInput="email"
        dialogTitle="Email"
        dialogDescription="This email is public"
        sudmitData={(data) => updateProfile(data)}
      />
      <DataEditCard
        label="Country"
        data={country}
        registerInput="country"
        dialogTitle="Country"
        dialogDescription="This information will be public"
        sudmitData={(data) => updateProfile(data)}
      />
    </div>
  );
}
