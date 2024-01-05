/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useEffect, useState } from "react";
import { Inventory, children } from "@/interface";
import {
  findAllInventories,
  createInventory,
  updateInventory,
  UpdateInventory,
  findIdInventory,
} from "@/endpoint/pos/inventory";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const InventoryContext = createContext({});

const InventoryProvider = ({ children }: children) => {
  const [inventories, setInventories] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const { data: session }: any = useSession();
  const { push } = useRouter();
  const { toast } = useToast();

  const findAll = async () => {
    const res = await findAllInventories({
      create_by: session?.user?._id ? session?.user?._id : session?.user?.id,
    });
    setInventories(res.data.Inventory.docs);
    setLoadingInventory(false);
  };

  const findByUuid = async (uuid: string, create_by: string) => {
    const res = await findIdInventory(uuid, create_by);
    return res.data;
  };

  const newInventory = async (data: Inventory) => {
    const res = await createInventory({
      ...data,
      create_by: session?.user?._id ? session?.user?._id : session?.user?.id,
    });
    if (res.data.status === 204) {
      findAll();
      push("/inventory");
      toast({ title: res.data.message });
    }
  };

  const updateDataInventory = async (data: UpdateInventory) => {
    const res = await updateInventory(data);
    if (res.data.status === 204) {
      findAll();
      toast({ title: res.data.message });
    }
  };

  useEffect(() => {
    if (session?.user !== undefined) {
      findAll();
    }
  }, [session?.user?._id, session?.user?.id]);

  return (
    <InventoryContext.Provider
      value={{
        findAll,
        newInventory,
        inventories,
        loadingInventory,
        updateDataInventory,
        findByUuid,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryContext, InventoryProvider };
