import { Separator } from "@/components/ui/separator";
import { FormNewInventory } from "./components/form";
import { ActionPanel } from "@/components/ActionPanel";
import { LayoutPage } from "@/components/LayoutPage";

export default function NewInventory() {
  return (
    <div className="w-full flex flex-col items-center">
      <LayoutPage>
        <ActionPanel
          title="Create a new inventory"
          description="Inventories will help you have better control of your products."
          keaworks={[
            { text: "Inventory" },
            { text: "Name" },
            { text: "Description" },
          ]}
          preferences={{
            buttonBack: {
              render: true,
              route: "/inventory",
            },
            viewKeaworks: true,
          }}
        />
        <span className="italic opacity-70 w-full px-3 py-3 text-sm">
          Required fields are marked with an asterisk (*).
        </span>
        <FormNewInventory />
      </LayoutPage>
    </div>
  );
}
