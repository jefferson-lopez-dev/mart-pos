"use client";

import { children } from "@/interface";
import { createContext } from "react";
import {
  searchAllFolder,
  searchInventoryFolders,
  createFolder,
  editFolder,
  searchAFolder,
} from "@/endpoint/pos/folder";
import { useSession } from "next-auth/react";

const folderContext = createContext({});

interface TypeCreateFolder {
  name: string;
  description: string;
  inventory_id: string;
}
interface TypeEditFolder {
  name: string;
  description: string;
  folder_uuid: string;
}

const FolderProvider = ({ children }: children) => {
  const { data: session }: any = useSession();

  const allFolders = async () => {
    const res = await searchAllFolder(session?.user?._id ?? session?.user?.id);
    return res;
  };

  const SearchAFolder = async (folder_uuid: string) => {
    const res = await searchAFolder({
      create_by: session?.user?._id ?? session?.user?.id,
      folder_uuid,
    });
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

  const EditFolder = async (data: TypeEditFolder) => {
    const res = await editFolder(data);
    return res;
  };

  return (
    <folderContext.Provider
      value={{
        SearchInventoryFolders,
        allFolders,
        CreateFolder,
        EditFolder,
        SearchAFolder,
      }}
    >
      {children}
    </folderContext.Provider>
  );
};

export { folderContext, FolderProvider };
