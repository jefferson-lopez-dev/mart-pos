import { Separator } from "@/components/ui/separator";
import { FormNewInventory } from "./components/form";
import { ActionPanel } from "@/components/ActionPanel";

export default function NewInventory() {
  return (
    <div className="h-[86dvh] w-full flex flex-col items-center">
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
      <span className="italic opacity-70 w-full max-w-[730px] px-3 py-3 text-sm">
        Required fields are marked with an asterisk (*).
      </span>
      <FormNewInventory />
    </div>
  );
}
