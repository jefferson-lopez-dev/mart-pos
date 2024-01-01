import { useContext } from "react";
import { InventoryContext } from "@/context/inventory";
import { Inventory } from "@/interface";

interface ValuesInventory {
  findAll: () => Promise<any>;
  newInventory: (data: Inventory) => Promise<any>;
  inventories: [];
}

export const useInventory = () => {
  const context = useContext(InventoryContext) as ValuesInventory;
  if (!context)
    throw new Error("useInventory must be used within a InventoryContext");
  return context;
};
