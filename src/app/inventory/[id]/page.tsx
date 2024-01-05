/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ActionPanel, ActionPanelSkeleton } from "@/components/ActionPanel";
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
  const [loadingInventory, setLoadingInventory] = useState(true);
  const { push } = useRouter();

  const loadingName = loadingInventory
    ? "Loading..."
    : inventory?.name === ""
    ? "No Name"
    : inventory?.name;

  const loadingDescription = loadingInventory
    ? "Loading..."
    : inventory?.description === ""
    ? "No Description"
    : inventory?.description;

  useEffect(() => {
    async function name() {
      const res = await findByUuid(
        params.id,
        session?.user?._id ? session?.user?._id : session?.user?.id
      );
      setInventory(res.inventory);
      setFechDataInventory(res);
      setLoadingInventory(false);
    }
    if (session?.user !== undefined) {
      name();
    }
  }, [session?.user?._id, session?.user?.id]);

  return (
    <div>
      {inventory === undefined ? (
        <div className="w-full flex flex-col items-center">
          <ActionPanelSkeleton />
          <div className="h-[400px]"></div>
        </div>
      ) : fechDataInventory?.status === 204 ? (
        <div className="w-full flex flex-col items-center">
          <ActionPanel
            title={`Inventory - ${loadingName}`}
            description={loadingDescription}
            keaworks={[
              { text: loadingName },
              { text: "Folders 0" },
              { text: "Products 0" },
            ]}
            preferences={{
              buttonBack: {
                render: true,
                route: "/inventory",
              },
              buttonPrimary: {
                render: true,
                icon: "Settings",
                route: `/inventory/${params.id}/configuration`,
              },
              buttonSecondary: {
                render: true,
                route: `/inventory/${params.id}`,
                text: "Create Folder",
              },
              viewKeaworks: true,
            }}
          />
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
