import { useContext } from "react";
import { InventoryContext } from "@/context/inventory";
import { Inventory } from "@/interface";
import { UpdateInventory } from "@/endpoint";

interface ValuesInventory {
  findAll: () => Promise<any>;
  newInventory: (data: Inventory) => Promise<any>;
  updateDataInventory: (data: UpdateInventory) => Promise<any>;
  findByUuid: (uuid: string, create_by: string) => Promise<any>;
  inventories: [];
  loadingInventory: boolean;
}

export const useInventory = () => {
  const context = useContext(InventoryContext) as ValuesInventory;
  if (!context)
    throw new Error("useInventory must be used within a InventoryContext");
  return context;
};
