/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ActionPanel, ActionPanelSkeleton } from "@/components/ActionPanel";
import { LayoutPage } from "@/components/LayoutPage";
import { useFolder, useInventory } from "@/hooks";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Folder } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const { SearchAFolder } = useFolder();
  const { findByUuid } = useInventory();
  const { data: session }: any = useSession();
  const [folder, setFolder] = useState<any>();
  const [inventory, setInventory] = useState<any>();

  useEffect(() => {
    async function name() {
      const folder = await SearchAFolder(params.folder_id);
      setFolder(folder.data);
      const inventory = await findByUuid(
        params.inventory_id,
        session?.user?._id ? session?.user?._id : session?.user?.id
      );
      setInventory(inventory.inventory);
    }
    if (session?.user !== undefined) {
      name();
    }
  }, [session?.user?._id, session?.user?.id]);

  return (
    <LayoutPage>
      {folder !== undefined ? (
        <ActionPanel
          title={`${folder?.name}`}
          description={`${
            folder?.description !== "" ? folder?.description : "No description"
          }`}
          keaworks={[
            { text: `Inventory: ${inventory?.name}` },
            { text: "Products 0" },
          ]}
          preferences={{
            buttonBack: {
              render: true,
              route: `/inventory/${params.inventory_id}`,
              text: `Back to ${inventory?.name ?? "..."}`,
            },
            buttonPrimary: {
              render: true,
              route: `/inventory/${params.inventory_id}/folder/${params.folder_id}/edit`,
              icon: "Pencil",
            },
            buttonSecondary: {
              render: true,
              route: `/inventory/${params.inventory_id}/folder/${params.folder_id}/product/new`,
              text: "Create Product",
            },
            iconTitle: {
              render: true,
              icon: "Folder",
              fill: true,
            },
            viewKeaworks: true,
          }}
        />
      ) : (
        <ActionPanelSkeleton />
      )}
      <div className="w-full p-3">
        <h2 className="text-2xl font-semibold">Products</h2>
      </div>
      <ScrollArea className="p-3 h-[300px]"></ScrollArea>
    </LayoutPage>
  );
}
