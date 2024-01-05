"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import { RenderInventories } from "./components/render-inventories";
import { Separator } from "@/components/ui/separator";
import { ActionPanel } from "@/components/ActionPanel";
import { useInventory } from "@/hooks";

export default function Page() {
  const { inventories, loadingInventory } = useInventory();

  const loading = loadingInventory
    ? "Loading inventories..."
    : inventories.length === 0
    ? "No Inventories"
    : `Total ${inventories.length}`;

  return (
    <div className="flex flex-col items-center">
      <ActionPanel
        title="Inventory"
        description="Create, edit and manage professionally."
        keaworks={[
          {
            text: loading,
          },
        ]}
        preferences={{
          buttonBack: { render: true, route: "/" },
          buttonSecondary: {
            render: true,
            text: "Create Inventory",
            route: "/inventory/new",
          },
          viewKeaworks: true,
        }}
      />
      <RenderInventories />
    </div>
  );
}
