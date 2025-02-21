import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function UserSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="bg-white rounded-md border min-w-72 h-[474px]">
        <div className="flex items-center gap-x-2.5 p-6 border-b">
          <Skeleton className="size-14 rounded-full" />
          <div className="flex flex-col">
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="p-6">
          <Skeleton className="h-5 w-20 mb-2" />
          <ul className="space-y-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </ul>
        </div>
        <div className="flex flex-col py-6 border-t space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      </div>
      <div className="space-y-4 w-full">
        <p className="font-semibold text-xl">Loading...</p>
        <div className="rounded-md bg-white border">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: 7 }).map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-6 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: 7 }).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-6 w-32" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
