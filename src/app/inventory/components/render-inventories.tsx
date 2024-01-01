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
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
          <div className="flex items-center pl-3 pt-3 gap-1">
            <span className="text-neutral-500">{i + 1} </span>
            <h1 className="text-2xl w-[200px] overflow-hidden text-ellipsis first-letter:uppercase">
              {inventory.name}
            </h1>
          </div>
          <Sheet>
            <SheetTrigger
              onClick={() => {
                setValue("name", inventory.name);
                setValue("description", inventory.description);
              }}
            >
              <TooltipProvider>
                <span className="w-[40px] h-[40px] flex items-center justify-center text-neutral-500 hover:dark:text-neutral-100 hover:text-neutral-800 cursor-pointer">
                  <Pencil size={20} />
                </span>
              </TooltipProvider>
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
                <div className="">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    {...register("name", {
                      required: true,
                      maxLength: 32,
                    })}
                  />
                  <span className="text-sm text-neutral-500">
                    The maximum number of characters is 32
                  </span>
                </div>
                <div className="">
                  <Label htmlFor="username" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="username"
                    className="col-span-3"
                    {...register("description", {
                      maxLength: 104,
                    })}
                  />
                  <span className="text-sm text-neutral-500">
                    The maximum number of characters is 104
                  </span>
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
        <p className="text-sm px-3 text-neutral-500 w-full overflow-hidden text-ellipsis">
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

  return viewInventories;
}