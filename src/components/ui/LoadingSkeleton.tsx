import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex p-5 gap-4 border-8">
          <Skeleton className="h-[200px] w-[150px]"/>
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4"/>
            <Skeleton className="h-4 w-1/2"/>
            <Skeleton className="h-4 w-1/3"/>
            <Skeleton className="h-4 w-1/4"/>
          </div>
        </div>
      ))}
    </div>
  );
}