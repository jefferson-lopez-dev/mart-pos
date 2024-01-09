/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ActionPanel, ActionPanelSkeleton } from "@/components/ActionPanel";
import { LayoutPage } from "@/components/LayoutPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFolder } from "@/hooks";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page({ params }: any) {
  const { EditFolder, SearchAFolder } = useFolder();
  const [folder, setFolder] = useState<any>();
  const { data: session }: any = useSession();
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    setValue("name", folder?.name);
    setValue("description", folder?.description);
  }, [folder]);

  useEffect(() => {
    async function name() {
      const folder = await SearchAFolder(params.folder_id);
      setFolder(folder.data);
    }
    if (session?.user !== undefined) {
      name();
    }
  }, [session?.user?._id, session?.user?.id, EditFolder]);

  return (
    <LayoutPage>
      {folder !== undefined ? (
        <ActionPanel
          preferences={{
            buttonBack: {
              render: true,
              route: `/inventory/${params.inventory_id}/folder/${params.folder_id}`,
              text: `Back to ${folder?.name}`,
            },
            iconTitle: {
              render: true,
              icon: "Folder",
              fill: true,
            },
            viewKeaworks: true,
          }}
          title={`Edit the folder ${folder?.name}`}
          description="Edit the name and description of the folder according to your preferences and tastes."
          keaworks={[{ text: "Name" }, { text: "Description" }]}
        />
      ) : (
        <ActionPanelSkeleton />
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          if (folder !== undefined) {
            await EditFolder({
              name: data.name,
              description: data.description,
              folder_uuid: folder.uuid,
            });
          }
        })}
        className="w-full max-w-[730px] px-3 py-5 flex flex-col gap-7"
      >
        <div className="w-full">
          <h2 className="text-lg">Name Folder</h2>
          <p className="pb-5 text-sm text-neutral-500">
            Enter an Folder name (required).
          </p>
          <div className="flex gap-6">
            <Input
              autoFocus
              type="text"
              {...register("name", { required: true, maxLength: 32 })}
            />
            <Button disabled={folder === undefined}>Save</Button>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-lg">Description Folder</h2>
          <p className="pb-5 text-sm text-neutral-500">
            Provide a brief and precise description (optional).
          </p>
          <div className="flex gap-6">
            <Input
              autoFocus
              type="text"
              placeholder={folder?.description === "" ? "No description" : ""}
              {...register("description", { maxLength: 104 })}
            />
            <Button disabled={folder === undefined}>Save</Button>
          </div>
        </div>
      </form>
    </LayoutPage>
  );
}
