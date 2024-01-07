"use client";

import { children } from "@/interface";
import { createContext } from "react";
import {
  searchAllFolder,
  searchInventoryFolders,
  createFolder,
} from "@/endpoint/pos/folder";
import { useSession } from "next-auth/react";

const folderContext = createContext({});

interface TypeCreateFolder {
  name: string;
  description: string;
  inventory_id: string;
}

const FolderProvider = ({ children }: children) => {
  const { data: session }: any = useSession();

  const allFolders = async () => {
    const res = await searchAllFolder(session?.user?._id ?? session?.user?.id);
    return res;
  };

  const SearchInventoryFolders = async (
    inventory_id: string,
    create_by: string
  ) => {
    const res = await searchInventoryFolders({
      create_by,
      inventory_id,
    });
    return {
      folders: res.data.docs,
      data: res.data,
    };
  };

  const CreateFolder = async (data: TypeCreateFolder) => {
    const res = await createFolder({
      ...data,
      create_by: session?.user?._id ?? session?.user?.id,
    });
    return res;
  };

  return (
    <folderContext.Provider
      value={{ SearchInventoryFolders, allFolders, CreateFolder }}
    >
      {children}
    </folderContext.Provider>
  );
};

export { folderContext, FolderProvider };
