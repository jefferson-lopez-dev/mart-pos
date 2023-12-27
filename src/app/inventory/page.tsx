import { Button } from "@/components/ui/button";
import { Info, Search } from "lucide-react";

export default function page() {
  return (
    <div className="flex flex-col items-center h-[85dvh]">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[730px] px-3 h-[120px] flex items-center ">
          <h1 className="text-3xl font-semibold">Inventory</h1>
        </div>
      </div>
      <div className="w-full border-b" />
      <div className="flex w-full max-w-[730px] gap-5 px-3 h-[90px] items-center justify-between">
        <div className="flex border w-full h-[45px] rounded-md overflow-hidden items-center">
          <div className="w-[45px] h-[45px] flex items-center justify-center">
            <Search className="text-neutral-500 w-[18px] h-[18px]" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="placeholder:text-neutral-500 bg-transparent w-full h-full focus:outline-none text-[14px]"
          />
        </div>
        <Button>New Inventory</Button>
      </div>
      <div className="w-full h-full max-w-[730px] px-3 pb-3">
        <div className=" text-neutral-500 flex flex-col items-center justify-center gap-2 w-full h-full rounded-md">
          <p className="text-center">
            You do not have inventories created. Create your first inventory!
          </p>
        </div>
      </div>
    </div>
  );
}
