import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="mt-2 h-4 w-[400px]" />
      </div>

      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-[500px] rounded-lg" />
    </div>
  )
}
