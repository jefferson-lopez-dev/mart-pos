import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div>
      <Input
        size={20}
        type="search"
        placeholder="Search..."
        className="h-[35px] md:w-[100px] lg:w-[300px] focus:outline-none"
      />
    </div>
  );
}
