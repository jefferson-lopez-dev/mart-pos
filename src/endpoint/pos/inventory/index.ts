import { pos } from "@/endpoint/config";

interface IDS {
  create_by: string;
}

interface Inventory {
  name: string;
  description?: string;
}
interface NewInventory extends IDS, Inventory {}
export interface UpdateInventory extends Inventory {
  uuid: string;
}

export const findAllInventories = async (data: IDS) => {
  return await pos.post("/inventory/alls", data);
};

export const findIdInventory = async (uuid: string, create_by: string) => {
  return await pos.get(`/inventory/${uuid}/${create_by}`);
};

export const createInventory = async (data: NewInventory) => {
  return await pos.post("/inventory", data);
};

export const updateInventory = async (data: UpdateInventory) => {
  return await pos.put("/inventory", data);
};

export const deleteInventory = async (id: string) => {
  return await pos.post(`/inventory/${id}`);
};
