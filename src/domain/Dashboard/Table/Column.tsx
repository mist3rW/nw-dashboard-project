import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CalendarIcon, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { MemberInfo } from '@/data/data';
import { cn } from '@/lib/utils';

type UserColumn = {
  id: number;
  memberInfo: MemberInfo;
  role: string;
  type: string;
  status: string;
  startDate: Date;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'memberInfo',
    header: 'Member',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 p-2 w-72">
          <img
            className="w-10 h-10 rounded-full"
            src={row.original.memberInfo.avatar}
            alt={row.original.memberInfo.name}
          />
          <div className="">
            <div className="font-semibold">{row.original.memberInfo.name}</div>
            <div className="text-secondary-foreground md:text-xs">
              {row.original.memberInfo.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: 'includesStringSensitive',
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 text-xs">
          <span
            className={cn(
              'px-2 py-1 text-xs rounded-full bg-secondary font-semibold flex items-center gap-1'
            )}
          >
            <svg
              fill="none"
              height="7"
              viewBox="0 0 7 7"
              width="7"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="3.5"
                cy="3.5"
                fill={
                  row.original.status === 'Active'
                    ? '#17C964'
                    : row.original.status === 'Paused'
                    ? '#F31260'
                    : row.original.status === 'Inactive'
                    ? '#a7a7a7'
                    : '#F5A524'
                }
                r="3.5"
              />
            </svg>
            {row.original.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-1 text-xs">
          <CalendarIcon className="h-4 w-4" />
          {new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }).format(row.original.startDate as unknown as Date)}
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Link to={`/user/${user.id}`}>View Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
