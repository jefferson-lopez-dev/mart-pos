/* eslint-disable react-hooks/exhaustive-deps */
"use client";

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
  const { findByUuid } = useInventory();
  const { data: session }: any = useSession();
  const [inventory, setInventory] = useState<any>();
  const [fechDataInventory, setFechDataInventory] = useState<any>();
  const { register } = useForm();
  console.log(params);

  useEffect(() => {
    async function name() {
      const res = await findByUuid(
        params.id,
        session?.user?._id ? session?.user?._id : session?.user?.id
      );
      setInventory(res.inventory);
      setFechDataInventory(res);
    }
    if (session?.user !== undefined) {
      name();
    }
  }, [session?.user?._id, session?.user?.id]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[730px] px-3 h-[120px] flex flex-col justify-center ">
        <h1 className="text-3xl font-semibold">Inventory Configuration</h1>
        <p className="text-sm text-neutral-500">
          Realiza las configuraciones nesesesarias al inventario{" "}
          <strong>{inventory?.name}</strong>
        </p>
      </div>
      <Separator />
      <div className="w-full max-w-[730px] px-3 py-5">
        <form>
          <div className="border w-full max-w-[700px] rounded-lg h-[200px] flex justify-between items-center">
            <div className="px-5">
              <h2 className="text-xl h-[40px] font-semibold">Name Inventory</h2>
              <p className="text-sm">Please enter name inventory.</p>
              <br />
              <div className="flex gap-9">
                <Input
                  type="text"
                  {...register("fullname", {
                    maxLength: 32,
                  })}
                />
                <Button className="w-[100px]" variant="default" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
