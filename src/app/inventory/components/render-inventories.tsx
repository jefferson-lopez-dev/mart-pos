/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { useInventory } from "@/hooks";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Dropdown } from "react-day-picker";

export function RenderInventories() {
  const { findAll: findAllInventories, inventories } = useInventory();
  const [onLoadData, setOnLoadData] = useState(false);

  useEffect(() => {
    async function fetchInventory() {
      const response = await findAllInventories();
      setOnLoadData(response);
    }
    fetchInventory();
  }, []);

  console.log(inventories);

  const inventory = inventories.map((inventory: any, i) => {
    return (
      <div key={i} className="w-full border rounded-md h-[100px]">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl pl-3 pt-3 first-letter:uppercase">
            <span className="text-neutral-500">{i + 1}.</span> {inventory.name}
          </h1>
          <div className="pt-3 pr-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="text-neutral-500 hover:dark:text-neutral-100 hover:text-neutral-800 cursor-pointer">
                  <MoreVertical />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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

  return !onLoadData ? loadingInventories : viewInventories;
}
