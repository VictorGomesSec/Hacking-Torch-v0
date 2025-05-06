import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="mt-2 h-4 w-[400px]" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />

        <div className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-[150px]" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[250px]" />
              <Skeleton className="h-4 w-[350px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Skeleton className="h-5 w-[150px]" />
                      <Skeleton className="h-4 w-[250px]" />
                    </div>
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </div>
                ))}
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-[150px]" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
