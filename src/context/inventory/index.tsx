"use client";

import { createContext, useState } from "react";
import { Inventory, children } from "@/interface";
import { findAllInventories, createInventory } from "@/endpoint/pos/inventory";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const InventoryContext = createContext({});

const InventoryProvider = ({ children }: children) => {
  const { data: session }: any = useSession();
  const [inventories, setInventories] = useState([]);
  const { push } = useRouter();
  const { toast } = useToast();

  const findAll = async () => {
    const res = await findAllInventories({
      create_by: session?.user?._id ? session?.user?._id : session?.user?.id,
    });
    setInventories(res.data.docs);
    console.log(res.data);
    return true;
  };

  const newInventory = async (data: Inventory) => {
    const res = await createInventory({
      ...data,
      create_by: session?.user?._id ? session?.user?._id : session?.user?.id,
    });
    if (res.data.status === 204) {
      push("/inventory");
      toast({ title: res.data.message });
    }
  };

  return (
    <InventoryContext.Provider value={{ findAll, newInventory, inventories }}>
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryContext, InventoryProvider };
