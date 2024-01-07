import { useContext } from "react";
import { folderContext } from "@/context/folder";

interface TypeCreateFolder {
  name: string;
  description: string;
  inventory_id: string;
}

interface Values {
  SearchInventoryFolders: (
    inventory_id: string,
    create_by: string
  ) => Promise<any>;
  allFolders: () => Promise<any>;
  CreateFolder: (data: TypeCreateFolder) => Promise<any>;
}

export const useFolder = () => {
  const context = useContext(folderContext) as Values;
  if (!context)
    throw new Error("useFolder must be used within a folderContext");
  return context;
};
