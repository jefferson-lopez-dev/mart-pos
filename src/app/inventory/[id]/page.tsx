/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useInventory } from "@/hooks";
import { Settings, Settings2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InventoryID({ params }: any) {
  const { findByUuid } = useInventory();
  const { data: session }: any = useSession();
  const [inventory, setInventory] = useState<any>();
  const [fechDataInventory, setFechDataInventory] = useState<any>();
  const { push } = useRouter();

  useEffect(() => {
    async function name() {
      const res = await findByUuid(
        params.id,
        session?.user?._id ? session?.user?._id : session?.user?.id
      );
      setInventory(res.inventory);
      setFechDataInventory(res);
    }
    if (session?.user !== undefined) {
      name();
    }
  }, [session?.user?._id, session?.user?.id]);

  return (
    <div>
      {inventory === undefined ? (
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-[730px] flex flex-col gap-5 p-3">
            <Skeleton className="w-full h-[100px]" />
            <Skeleton className="w-full h-[450px]" />
          </div>
        </div>
      ) : fechDataInventory?.status === 204 ? (
        <div className="w-full flex flex-col items-center">
          <nav className="w-full max-w-[730px] px-3 h-[100px] flex flex-col justify-center">
            <div className="w-full flex justify-between">
              <h1 className="text-3xl font-semibold">
                Inventory {inventory?.name ? inventory.name : "loading..."}
              </h1>
              <Link
                href={`/inventory/${params.id}/configuration`}
                className="w-[40px] h-[40px] flex items-center justify-center rounded-sm"
              >
                <Settings size={24} />
              </Link>
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
              <Button>Create Folder</Button>
            </div>
          </div>
          <Separator />
          <div className="w-full max-w-[730px] p-3 h-[450px]"></div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="h-[87dvh] w-full max-w-[730px]">
            <nav className="flex items-center justify-between h-[100px] p-3">
              <h1 className="text-3xl font-semibold">Inventory Unauthorized</h1>
              <Button
                variant="secondary"
                onClick={() => {
                  push("/inventory");
                }}
              >
                Back
              </Button>
            </nav>
            <Separator />
            <div className="w-full flex items-center justify-center flex-col px-3">
              <span className="text-6xl pt-[140px]">401</span>
              <p className="pt-7 text-center">
                You are not authorized to access this inventory. All inventories
                are private and only the owner has permission to view them.
                Please verify that you are trying to access the correct
                inventory and make sure you have the necessary permissions.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
