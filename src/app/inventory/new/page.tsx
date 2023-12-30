import { Separator } from "@/components/ui/separator";
import { FormNewInventory } from "./components/form";

export default function NewInventory() {
  return (
    <div className="h-[86dvh] w-full flex flex-col items-center">
      <div className="w-full max-w-[730px] px-3 h-[120px] flex flex-col justify-center">
        <h1 className="text-3xl font-semibold">Create a new inventory</h1>
        <p className="text-sm">
          Inventories will help you have better control of your products
        </p>
      </div>
      <Separator />
      <span className="italic opacity-70 w-full max-w-[730px] px-3 py-3 text-sm">
        Required fields are marked with an asterisk (*).
      </span>
      <FormNewInventory />
    </div>
  );
}
