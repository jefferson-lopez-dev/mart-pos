"use client";
import { RenderInventories } from "@/components/inventory/render-inventories";
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
      <ActionPanel
        title="Inventory"
        description="Create, edit and manage professionally."
        keaworks={[
          {
            text: loading,
          },
        ]}
        preferences={{
          buttonBack: { render: true, route: "/", text: "Home" },
          buttonSecondary: {
            render: true,
            text: "Create Inventory",
            route: "/inventory/new",
          },
          iconTitle: { render: true, icon: "Box" },
          viewKeaworks: true,
        }}
      />
      <LayoutPage>
        <RenderInventories />
      </LayoutPage>
    </div>
  );
}
