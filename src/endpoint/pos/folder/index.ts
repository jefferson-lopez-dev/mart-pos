import { pos } from "@/endpoint/config";

interface IDS {
  inventory_id?: string;
  create_by?: string;
  folder_uuid?: string;
}

interface TypeSearchInventoryFolders {
  inventory_id: string;
  create_by: string;
}

interface Folder {
  name: string;
  description: string;
  inventory_id: string;
  create_by: string;
}

const searchAllFolder = async (create_by: string) => {
  return await pos.post("/search/allFolders", { create_by });
};

const searchInventoryFolders = async (data: TypeSearchInventoryFolders) => {
  return await pos.post("/folder/searchInventoryFolders", data);
};

const createFolder = async (data: Folder) => {
  return await pos.post("/folder", data);
};

export { searchAllFolder, searchInventoryFolders, createFolder };
