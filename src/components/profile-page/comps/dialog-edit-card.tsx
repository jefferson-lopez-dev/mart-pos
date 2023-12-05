"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Settings2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogEditCardProps } from "../common";

export function DialogEditCard({
  data,
  dialogTitle,
  dialogDescription,
  sudmitData,
  label,
  registerInput,
}: DialogEditCardProps) {
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    setValue(registerInput, data);
  }, [data, registerInput, setValue]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-[30px] h-[30px]  rounded-full bg-neutral-900 flex items-center justify-center">
          <Settings2Icon className="opacity-50 cursor-pointer" size={18} />
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
  );
}
