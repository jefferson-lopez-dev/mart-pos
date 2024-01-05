import { Skeleton } from "../ui/skeleton";

export function ActionPanelSkeleton() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[730px] px-3 pb-4">
        <div className="h-[50px] flex items-center justify-between">
          <Skeleton className="w-[60px] h-[30px]" />
          <Skeleton className="w-[30px] h-[30px]" />
        </div>
        <div className="h-[70px] flex gap-2 flex-col">
          <Skeleton className="w-[250px] h-[30px]" />
          <Skeleton className="w-[150px] h-[15px]" />
        </div>
        <div className="flex gap-4 h-[50px] items-center justify-between">
          <Skeleton className="w-[250px] h-[40px]" />
          <Skeleton className="w-[150px] h-[40px]" />
        </div>
      </div>
    </div>
  );
}
