/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useInventory } from "@/hooks";
import { Pencil } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export function RenderInventories() {
  const { inventories, loadingInventory, updateDataInventory } = useInventory();
  const { handleSubmit, register, setValue } = useForm();

  const inventory = inventories.map((inventory: any, i) => {
    return (
      <div
        key={i}
        className="w-full border rounded-md h-[100px] cursor-pointer hover:border-neutral-500"
      >
        <div className="w-full flex justify-between">
          <h1 className="text-2xl pl-3 pt-3 first-letter:uppercase">
            <span className="text-neutral-500">{i + 1}.</span> {inventory.name}
          </h1>
          <Sheet>
            <SheetTrigger
              onClick={() => {
                setValue("name", inventory.name);
                setValue("description", inventory.description);
              }}
            >
              <span className="w-[40px] h-[40px] flex items-center justify-center text-neutral-500 hover:dark:text-neutral-100 hover:text-neutral-800 cursor-pointer">
                <Pencil size={20} />
              </span>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit Inventory {inventory.name}</SheetTitle>
                <SheetDescription>
                  Edit the inventory name and description as needed
                </SheetDescription>
              </SheetHeader>
              <form
                className="grid gap-4 py-4"
                onSubmit={handleSubmit((data) => {
                  updateDataInventory({
                    name: data.name,
                    description: data.description,
                    uuid: inventory.uuid,
                  });
                })}
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="username"
                    className="col-span-3"
                    {...register("description")}
                  />
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>
        <p className="text-sm pl-3 text-neutral-500">
          {!inventory.description ? "No description." : inventory.description}
        </p>
      </div>
    );
  });

  const viewInventories = (
    <div className="w-full h-full max-w-[730px] px-3 pb-3">
      <div className="flex flex-col items-center gap-2 w-full h-full rounded-md">
        {inventories.length === 0 ? (
          <p className="text-center text-sm h-[400px] w-full flex items-center justify-center text-neutral-500">
            You do not have inventories created. Create your first inventory!
          </p>
        ) : (
          inventory
        )}
      </div>
    </div>
  );

  const loadingInventories = (
    <div className="w-full h-full max-w-[730px] px-3 pb-3">
      <div className=" text-neutral-500 flex flex-col items-center justify-center gap-2 w-full h-full rounded-md">
        <div className="text-center text-sm">Loading...</div>
      </div>
    </div>
  );

  return loadingInventory ? loadingInventories : viewInventories;
}
