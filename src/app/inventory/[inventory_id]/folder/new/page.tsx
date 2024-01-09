/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ActionPanel } from "@/components/ActionPanel";
import { LayoutPage } from "@/components/LayoutPage";
import { useParams } from "next/navigation";
import { FormNewFolder } from "./form";
import { useEffect, useState } from "react";
import { useInventory } from "@/hooks";
import { useSession } from "next-auth/react";

export default function NewFolder({ params }: any) {
  const { findByUuid } = useInventory();
  const [inventory, setInventory] = useState<any>();
  const { data: session }: any = useSession();

  useEffect(() => {
    async function name() {
      const res = await findByUuid(
        params.inventory_id,
        session?.user?._id ? session?.user?._id : session?.user?.id
      );
      setInventory(res.inventory);
    }
    if (session?.user !== undefined) {
      name();
    }
  }, [session?.user?._id, session?.user?.id]);

  return (
    <LayoutPage>
      <ActionPanel
        title={`Create a new folder`}
        description="Folders streamline product organization, simplifying inventory management."
        keaworks={[{ text: `Inventory ${inventory?.name ?? ""}` }]}
        preferences={{
          buttonBack: {
            render: true,
            route: `/inventory/${params.inventory_id}`,
            text: `Back to ${inventory?.name ?? "..."}`,
          },
          viewKeaworks: true,
        }}
      />
      <FormNewFolder />
    </LayoutPage>
  );
}
