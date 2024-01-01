import { pos } from "@/endpoint/config";

interface IDS {
  create_by: string;
}

interface Inventory {
  name: string;
  description?: string;
}
interface NewInventory extends IDS, Inventory {}

export const findAllInventories = async (data: IDS) => {
  return await pos.post("/inventory/alls", data);
};

export const createInventory = async (data: NewInventory) => {
  return await pos.post("/inventory", data);
};

export const updateInventory = async (data: Inventory) => {
  return await pos.post("/inventory", data);
};

export const deleteInventory = async (id: string) => {
  return await pos.post(`/inventory/${id}`);
};
