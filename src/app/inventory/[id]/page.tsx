/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ActionPanel, ActionPanelSkeleton } from "@/components/ActionPanel";
import { LayoutPage } from "@/components/LayoutPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useFolder, useInventory } from "@/hooks";
import { Folder, Settings, Settings2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InventoryID({ params }: any) {
  const { findByUuid } = useInventory();
  const { data: session }: any = useSession();
  const [inventory, setInventory] = useState<any>();
  const [folders, setFolders] = useState([]);
  const [fechDataInventory, setFechDataInventory] = useState<any>();
  const [loadingInventory, setLoadingInventory] = useState(true);
  const { push } = useRouter();
  const { SearchInventoryFolders } = useFolder();

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
      const InventoryFolders = await SearchInventoryFolders(
        params.id,
        session?.user?._id ? session?.user?._id : session?.user?.id
      );
      console.log(InventoryFolders);
      setFolders(InventoryFolders.folders);
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
          <LayoutPage>
            <div className="p-3">
              <div className="w-full">
                <h2 className="text-2xl font-semibold pb-3">Folders</h2>
              </div>
              <div className="h-[300px] flex flex-col gap-1">
                <Skeleton className="w-full h-[40px]" />
                <Skeleton className="w-full h-[40px]" />
              </div>
            </div>
            <div className="p-3">
              <div className="w-full">
                <h2 className="text-2xl font-semibold pb-3">Products</h2>
              </div>
              <div className="h-[300px] flex flex-col gap-1">
                <Skeleton className="w-full h-[40px]" />
                <Skeleton className="w-full h-[40px]" />
                <Skeleton className="w-full h-[40px]" />
                <Skeleton className="w-full h-[40px]" />
              </div>
            </div>
            <div></div>
          </LayoutPage>
        </div>
      ) : fechDataInventory?.status === 204 ? (
        <div className="w-full flex flex-col items-center">
          <ActionPanel
            title={`Inventory - ${loadingName}`}
            description={loadingDescription}
            keaworks={[
              { text: loadingName },
              { text: `Folders ${folders.length}` },
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
                route: `/inventory/${params.id}/folder/new`,
                text: "Create Folder",
              },
              viewKeaworks: true,
            }}
          />
          <LayoutPage>
            <div className="p-3">
              <div className="w-full">
                <h2 className="text-2xl font-semibold pb-3">Folders</h2>
              </div>
              <ScrollArea className="h-[300px]">
                {folders?.length === 0 ? (
                  <p className="w-full h-[300px] flex items-center justify-center text-neutral-500">
                    No Folders
                  </p>
                ) : (
                  folders.map((folder: any, i: any) => {
                    return (
                      <Button
                        variant="ghost"
                        className="w-full flex justify-start gap-1 items-center"
                        key={i}
                      >
                        <div className="flex items-center w-full justify-start gap-2">
                          <div className="flex items-center justify-center text-neutral-500">
                            <Folder />
                          </div>
                          <p>{folder.name}</p>
                        </div>
                        <div></div>
                      </Button>
                    );
                  })
                )}
              </ScrollArea>
            </div>
            <Separator />
            <div className="px-3 pt-3">
              <div className="w-full">
                <h2 className="text-2xl font-semibold pb-3">Products</h2>
              </div>
              <ScrollArea className="h-[300px]">
                <p className="w-full h-[300px] flex items-center justify-center text-neutral-500">
                  No Products
                </p>
              </ScrollArea>
            </div>
          </LayoutPage>
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <ActionPanel
            title="Inventory Unauthorized"
            description="401:You are not authorized to access this inventory."
            keaworks={[
              { text: "Error" },
              { text: "Unauthorized" },
              { text: "Private" },
            ]}
            preferences={{
              buttonBack: {
                render: true,
                route: "/inventory",
              },
              viewKeaworks: true,
            }}
          />
          <LayoutPage>
            <div className="w-full flex items-center justify-center flex-col px-3">
              <span className="text-6xl pt-[140px]">401</span>
              <p className="pt-7 text-center">
                You are not authorized to access this inventory. All inventories
                are private and only the owner has permission to view them.
                Please verify that you are trying to access the correct
                inventory and make sure you have the necessary permissions.
              </p>
            </div>
          </LayoutPage>
        </div>
      )}
    </div>
  );
}
