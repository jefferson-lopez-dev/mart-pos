"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { credsData } from "./__functions";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { PencilIcon } from "lucide-react";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TypesInputDataEdit } from "./__types";

export function DataEditCard({
  label,
  data,
  sudmitData,
  editData = true,
  registerInput = "",
  dialogDescription = "",
  dialogTitle,
}: TypesInputDataEdit) {
  const { handleSubmit, register, setValue } = useForm();
  useEffect(() => {
    setValue(registerInput, data);
  }, [data, registerInput, setValue]);

  return (
    <div className="w-full sm:w-[500px] h-[50px] flex justify-between px-3 py-1 items-center  rounded-lg ">
      <div>
        <p className="opacity-50 text-[12px]">{label}</p>
        <p className="opacity-90 overflow-hidden text-ellipsis break-keep">
          {credsData(data)}
        </p>
      </div>
      {editData && (
        <Dialog>
          <DialogTrigger>
            <div className="w-[30px] h-[30px]  rounded-full bg-neutral-900 flex items-center justify-center">
              <PencilIcon className="opacity-50 cursor-pointer" size={18} />
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
      )}
    </div>
  );
}
