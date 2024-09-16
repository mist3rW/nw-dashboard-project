import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { FilterXIcon } from 'lucide-react';

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const customFilterFn = (rows: any, columnId: string, filterValue: string) => {
  const memberName = rows.original.memberInfo.name.toLowerCase();
  const role = rows.original.role.toLowerCase();
  const searchValue = filterValue.toLowerCase();

  return memberName.includes(searchValue) || role.includes(searchValue);
};

export function UserTable<TData, TValue>({
  columns,
  data,
}: UserTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: customFilterFn,
    state: { sorting, columnFilters, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Team Members
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Manage your team members here
      </p>
      <div className="flex flex-col md:flex-row items-center gap-2 pt-2 mb-2">
        {/* Search By name */}
        <Input
          placeholder="Search by name or role"
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="w-full md:w-[220px]"
        />
        <div className="flex flex-row gap-1 ">
          {/* Worker Type Filter */}
          <Select
            value={
              (table.getColumn('type')?.getFilterValue() as string) ?? 'all'
            }
            onValueChange={(value) => {
              if (value === 'all') {
                table.getColumn('type')?.setFilterValue(undefined);
              } else {
                table.getColumn('type')?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-5/12">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Type</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Contractor">Contractor</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Status Filter */}
          <Select
            value={
              (table.getColumn('status')?.getFilterValue() as string) ?? 'all'
            }
            onValueChange={(value) => {
              if (value === 'all') {
                table.getColumn('status')?.setFilterValue(undefined);
              } else {
                table.getColumn('status')?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-5/12">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Vacation">Vacation</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Clear Filter Btn */}
          <Button
            onClick={() => {
              table.resetColumnFilters();
              setGlobalFilter('');
            }}
            className="text-sm w-auto"
          >
            <FilterXIcon className="w-4 h-4 md:mr-2" />
            <span className="hidden md:block">Reset Filters</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
