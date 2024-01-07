"use client";

import { ActionPanel } from "@/components/ActionPanel";
import { LayoutPage } from "@/components/LayoutPage";
import { useParams } from "next/navigation";
import { FormNewFolder } from "./components/form";

export default function NewFolder() {
  const params = useParams();
  return (
    <LayoutPage>
      <ActionPanel
        title={`Create a new folder`}
        description="Folders streamline product organization, simplifying inventory management."
        keaworks={[
          { text: `Inventory - ${params.id}` },
          { text: "Folder name" },
          { text: "Folder description" },
        ]}
        preferences={{
          buttonBack: { render: true, route: `/inventory/${params.id}` },
          viewKeaworks: true,
        }}
      />
      <FormNewFolder />
    </LayoutPage>
  );
}
