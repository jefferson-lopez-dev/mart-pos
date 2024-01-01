"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useInventory } from "@/hooks";

export function FormNewInventory() {
  const { handleSubmit, register } = useForm();
  const { newInventory } = useInventory();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const res = await newInventory({
          name: data.name,
          description: data.description,
        });
      })}
      className="w-full max-w-[730px] px-3 flex flex-col gap-5"
    >
      <div className="w-full">
        <Label>
          inventory name <span className="opacity-70">*</span>
        </Label>
        <Input
          autoFocus
          type="text"
          {...register("name", { required: true })}
        />
      </div>
      <div className="w-full">
        <Label>
          Inventory description <span className="opacity-70">(optional)</span>
        </Label>
        <Input type="text" {...register("description")} />
      </div>
      <div className="flex justify-between">
        <Link href="/inventory">
          <Button type="button" variant="destructive">
            Cancel
          </Button>
        </Link>
        <Button type="submit">Create Inventory</Button>
      </div>
    </form>
  );
}
