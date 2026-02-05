import Image from 'next/image';
import { App } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardTableProps {
  apps: App[];
  isLoading: boolean;
}

export function DashboardTable({ apps, isLoading }: DashboardTableProps) {
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="bg-card overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-foreground h-10 w-[300px] px-3 py-2 text-[0.75rem] font-semibold">
              Application
            </TableHead>
            <TableHead className="text-foreground h-10 px-3 py-2 text-[0.75rem] font-semibold">
              Store
            </TableHead>
            <TableHead className="text-foreground h-10 px-3 py-2 text-[0.75rem] font-semibold">
              Version
            </TableHead>
            <TableHead className="text-foreground h-10 px-3 py-2 text-[0.75rem] font-semibold">
              Last Update
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apps.map((app) =>
            app.stores.map((store, index) => (
              <TableRow
                key={`${app.id}-${store.id}`}
                className="hover:bg-muted/50 border-b transition-colors last:border-0"
              >
                {index === 0 && (
                  <TableCell rowSpan={app.stores.length} className="px-3 py-[0.625rem] align-top">
                    <div className="flex items-start gap-2">
                      {app.icon ? (
                        <Image
                          src={app.icon}
                          alt={app.name}
                          width={24}
                          height={24}
                          className="app-icon"
                          unoptimized
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      ) : (
                        <div className="app-icon bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">
                          {app.name.charAt(0)}
                        </div>
                      )}
                      <span className="pt-0.5 leading-tight font-semibold">{app.name}</span>
                    </div>
                  </TableCell>
                )}
                <TableCell className="px-3 py-[0.625rem]">
                  <a
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground transition-colors hover:underline"
                  >
                    {store.name}
                  </a>
                </TableCell>
                <TableCell className="px-3 py-[0.625rem]">
                  {store.version !== 'N/A' ? (
                    <Badge
                      variant="secondary"
                      className="rounded-[calc(var(--radius)-2px)] px-2 py-0.5 font-mono text-[0.6875rem]"
                    >
                      {store.version}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-[0.6875rem] italic">N/A</span>
                  )}
                </TableCell>
                <TableCell className="px-3 py-[0.625rem] text-[0.8125rem] whitespace-nowrap">
                  {store.lastUpdateDate}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="bg-card overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-left text-[0.75rem] font-semibold">Application</TableHead>
            <TableHead className="text-left text-[0.75rem] font-semibold">Store</TableHead>
            <TableHead className="text-left text-[0.75rem] font-semibold">Version</TableHead>
            <TableHead className="text-left text-[0.75rem] font-semibold">Last Update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="px-3 py-[0.625rem]">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-6 rounded-sm" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </TableCell>
              <TableCell className="px-3 py-[0.625rem]">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="px-3 py-[0.625rem]">
                <Skeleton className="h-5 w-12 rounded-full" />
              </TableCell>
              <TableCell className="px-3 py-[0.625rem]">
                <Skeleton className="h-4 w-16" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
