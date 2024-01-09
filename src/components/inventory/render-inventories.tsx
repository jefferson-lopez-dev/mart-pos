/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { useInventory } from "@/hooks";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function RenderInventories() {
  const { inventories } = useInventory();
  const { push } = useRouter();

  const inventory = inventories.map((inventory: any, i) => {
    return (
      <div
        onClick={() => {
          push(`inventory/${inventory.uuid}`);
        }}
        key={i}
        className="w-full border rounded-md h-[100px] cursor-pointer hover:border-neutral-500"
      >
        <div className="w-full flex justify-between">
          <div className="flex items-center pl-3 pt-3 gap-1">
            <span className="text-neutral-500 text-2xl">{i + 1}.</span>
            <h1 className="text-2xl w-[200px] overflow-hidden text-ellipsis first-letter:uppercase">
              {inventory.name}
            </h1>
          </div>
          <span className="w-[40px] h-[40px] flex items-center justify-center text-neutral-500 hover:text-blue-500 hover:translate-y-[-3px] hover:translate-x-[3px] duration-500">
            <ArrowUpRight size={20} />
          </span>
        </div>
        <p className="text-sm px-3 text-neutral-500 w-full overflow-hidden text-ellipsis">
          {!inventory.description ? "No description." : inventory.description}
        </p>
      </div>
    );
  });

  const loadingInventories = (
    <div className="w-full h-full max-w-[730px] px-3 pb-3">
      <div className=" text-neutral-500 flex flex-col items-center justify-center gap-2 w-full h-full rounded-md">
        <div className="text-center text-sm">Loading...</div>
      </div>
    </div>
  );

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

  return viewInventories;
}
