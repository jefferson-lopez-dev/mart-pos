/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInventory } from "@/hooks";
import { Menu, MoreVertical, Settings, Settings2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function InventoryID({ params }: any) {
  const { findByUuid } = useInventory();
  const { data: session }: any = useSession();
  const [inventory, setInventory] = useState<any>();

  useEffect(() => {
    async function name() {
      const res = await findByUuid(
        params.id,
        session?.user?._id ? session?.user?._id : session?.user?.id
      );
      setInventory(res);
    }
    name();
  }, [session]);

  return (
    <div>
      <div className="w-full flex flex-col items-center">
        <nav className="w-full max-w-[730px] px-3 h-[100px] flex flex-col justify-center">
          <div className="w-full flex justify-between">
            <h1 className="text-3xl font-semibold">
              Inventory {inventory?.name ? inventory.name : "loading..."}
            </h1>
            <button className="w-[40px] h-[40px] flex items-center justify-center rounded-sm">
              <Settings2 size={24} />
            </button>
          </div>
          <p className="text-sm">
            {inventory?.description ? inventory.description : "loading..."}
          </p>
        </nav>
        <div className="w-full max-w-[730px] p-3 flex items-center justify-between">
          <div className="flex gap-3 ">
            <Badge variant="secondary">Folders 0</Badge>
            <Badge variant="secondary">Products 0</Badge>
          </div>
          <div className="flex justify-end">
            <Button>Add Folder</Button>
          </div>
        </div>
        <Separator />
        <div className="w-full max-w-[730px] p-3 h-[450px]"></div>
      </div>
    </div>
  );
}
