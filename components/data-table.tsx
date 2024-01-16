'use client';

import { useEffect, useRef } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  highlightValue?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  highlightValue,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const highlightRef = useRef<HTMLTableCellElement>(null);

  useEffect(() => {
    const highlightCell = highlightRef.current;
    if (!highlightCell) {
      return;
    }

    highlightCell.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [highlightRef, data]);

  return (
    <Table className={className}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className='hover:bg-background'>
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
          table.getRowModel().rows.map((row, i) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className={i % 2 ? 'bg-card' : 'bg-light'}
            >
              {row.getVisibleCells().map((cell) => {
                const isHighlighted =
                  highlightValue &&
                  (cell.getValue() as string)?.toLowerCase() ===
                    highlightValue.toLowerCase();
                return (
                  <TableCell
                    key={cell.id}
                    className={cn('m-auto', isHighlighted ? 'bg-accent' : '')}
                    ref={isHighlighted ? highlightRef : null}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
