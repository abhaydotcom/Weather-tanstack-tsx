import { Skeleton } from "./ui/skeleton"


function Loading_Skeleton() {
  return (
    <div className="space-y-6">
        <div className="grid gap-6">
            <Skeleton className="w-full h-[300px] rounded-lg"/>
            <Skeleton className="w-full h-[300px] rounded-lg"/>
            <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="w-full h-[300px] rounded-lg"/>
            <Skeleton  className="w-full h-[300px] rounded-lg"/>

            </div>
        </div>
    </div>
  )
}

export default Loading_Skeleton