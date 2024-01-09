"use client";
import React, { useReducer } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useFolder } from "@/hooks";
import { useParams, useRouter } from "next/navigation";

export function FormNewFolder() {
  const { handleSubmit, register } = useForm();
  const { CreateFolder } = useFolder();
  const { push } = useRouter();
  const params = useParams();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const res = await CreateFolder({
          name: data.name,
          description: data.description,
          inventory_id: String(params.inventory_id),
        });
        console.log(res);
        push(`/inventory/${params.inventory_id}`);
      })}
      className="w-full max-w-[730px] px-3 flex flex-col gap-5"
    >
      <div className="w-full">
        <Label>
          Folder name <span className="opacity-70 text-red-500">*</span>
        </Label>
        <Input
          autoFocus
          type="text"
          {...register("name", { required: true })}
        />
      </div>
      <div className="w-full">
        <Label>
          Folder description <span className="opacity-70">(optional)</span>
        </Label>
        <Input type="text" {...register("description")} />
      </div>
      <div className="flex justify-between">
        <Link href={`/inventory/${params.inventory_id}`}>
          <Button type="button" variant="destructive">
            Cancel
          </Button>
        </Link>
        <Button type="submit">Create Folder</Button>
      </div>
    </form>
  );
}
