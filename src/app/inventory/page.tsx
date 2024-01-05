"use client";
import { RenderInventories } from "./components/render-inventories";
import { ActionPanel } from "@/components/ActionPanel";
import { LayoutPage } from "@/components/LayoutPage";
import { useInventory } from "@/hooks";

export default function Page() {
  const { inventories, loadingInventory } = useInventory();

  const loading = loadingInventory
    ? "Loading inventories..."
    : inventories.length === 0
    ? "No Inventories"
    : `Total ${inventories.length}`;

  return (
    <div className="w-full flex flex-col items-center">
      <LayoutPage>
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
      </LayoutPage>
    </div>
  );
}
