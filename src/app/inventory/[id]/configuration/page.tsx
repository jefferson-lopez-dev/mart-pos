/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ActionPanel } from "@/components/ActionPanel";
import { LayoutPage } from "@/components/LayoutPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useInventory } from "@/hooks";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SettingsInventory() {
  const params: any = useParams();
  const { findByUuid, updateDataInventory } = useInventory();
  const { data: session }: any = useSession();
  const [inventory, setInventory] = useState<any>();
  const [fechDataInventory, setFechDataInventory] = useState<any>();
  const [loadingInventory, setLoadingInventory] = useState(true);
  const { register, handleSubmit, setValue } = useForm();

  const loadingName = loadingInventory
    ? "Loading..."
    : inventory?.name === ""
    ? "No Name"
    : inventory?.name;

  useEffect(() => {
    setValue("name", inventory?.name);
    setValue("description", inventory?.description);
  }, [inventory]);

  useEffect(() => {
    async function name() {
      const res = await findByUuid(
        params.id,
        session?.user?._id ? session?.user?._id : session?.user?.id
      );
      setInventory(res.inventory);
      setFechDataInventory(res);
      setLoadingInventory(false);
    }
    if (session?.user !== undefined) {
      name();
    }
  }, [session?.user?._id, session?.user?.id, updateDataInventory]);

  return (
    <div className="flex flex-col items-center">
      <ActionPanel
        title="Inventory Configuration"
        description="Make the required configurations in the inventory."
        keaworks={[
          { text: loadingName },
          { text: "Name" },
          { text: "Description" },
        ]}
        preferences={{
          buttonBack: {
            render: true,
            route: `/inventory/${params.id}`,
          },
          viewKeaworks: true,
        }}
      />
      <LayoutPage>
        <form
          onSubmit={handleSubmit(async (data) => {
            if (inventory !== undefined) {
              await updateDataInventory({
                name: data.name,
                description: data.description,
                uuid: inventory.uuid,
              });
            }
          })}
          className="w-full max-w-[730px] px-3 py-5 flex flex-col gap-7"
        >
          <div className="w-full">
            <h2 className="text-lg">Name Inventory</h2>
            <p className="pb-5 text-sm text-neutral-500">
              Enter an inventory name (required).
            </p>
            <div className="flex gap-6">
              <Input
                autoFocus
                type="text"
                {...register("name", { required: true, maxLength: 32 })}
              />
              <Button disabled={inventory === undefined}>Save</Button>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-lg">Description Inventory</h2>
            <p className="pb-5 text-sm text-neutral-500">
              Provide a brief and precise description (optional).
            </p>
            <div className="flex gap-6">
              <Input
                autoFocus
                type="text"
                placeholder={
                  inventory?.description === "" ? "No description" : ""
                }
                {...register("description", { maxLength: 104 })}
              />
              <Button disabled={inventory === undefined}>Save</Button>
            </div>
          </div>
        </form>
      </LayoutPage>
    </div>
  );
}
