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

interface TypeSearchAFolder {
  folder_uuid: string;
  create_by: string;
}

interface EditFolder {
  name: string;
  description: string;
  folder_uuid: string;
}

const searchAllFolder = async (create_by: string) => {
  return await pos.post("/search/allFolders", { create_by });
};

const searchAFolder = async (data: TypeSearchAFolder) => {
  return await pos.post("/folder/search/aFolder", data);
};

const searchInventoryFolders = async (data: TypeSearchInventoryFolders) => {
  return await pos.post("/folder/searchInventoryFolders", data);
};

const createFolder = async (data: Folder) => {
  return await pos.post("/folder", data);
};

const editFolder = async (data: EditFolder) => {
  return await pos.put("/folder", data);
};

export {
  searchAllFolder,
  searchInventoryFolders,
  createFolder,
  editFolder,
  searchAFolder,
};
