/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { RefObject, useEffect, useState } from 'react';

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  Table,
  useReactTable
} from '@tanstack/react-table';
import { useVirtualizer, VirtualItem, Virtualizer } from '@tanstack/react-virtual';

import { useStore } from '~/shares/stores';
import { IOlympicData } from '~/types';

export default function Normal() {
  const {
    MockData: { list },
    Theme: { theme }
  } = useStore();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  console.log(theme);
  const columns = React.useMemo<ColumnDef<IOlympicData, any>[]>(
    () => [
      {
        accessorKey: 'athlete',
        header: 'Athlete',
        // cell: (info) => info.getValue(),
        size: 300
      },
      {
        accessorKey: 'country',
        header: 'Country',
        // cell: (info) => info.getValue(),
        size: 250
      },
      {
        accessorKey: 'age',
        header: 'Age',
        // cell: (info) => info.getValue(),
        meta: { filterVariant: 'range' },
        size: 220
      },
      {
        accessorKey: 'year',
        header: 'Year',
        meta: { filterVariant: 'range' },
        size: 200
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 200
      },
      {
        accessorKey: 'silver',
        header: 'Silver',
        meta: { filterVariant: 'range' },
        size: 200
      },
      {
        accessorKey: 'gold',
        header: 'Gold',
        meta: { filterVariant: 'select' },
        size: 200
      },
      {
        accessorKey: 'total',
        header: 'Total',
        meta: { filterVariant: 'range' },
        size: 150
      }
    ],
    []
  );

  const [data, setData] = useState<IOlympicData[]>([]);
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false
  });

  useEffect(() => {
    setData(list);
  }, [list]);

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className='container'
      ref={tableContainerRef}
      style={{
        overflow: 'auto',
        position: 'relative',
        height: '800px'
      }}
    >
      <table style={{ display: 'grid' }}>
        <thead
          style={{
            display: 'grid',
            // position: 'sticky',
            top: 0,
            zIndex: 1
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={{ display: 'flex', width: '100%' }}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    style={{
                      display: 'flex',
                      width: header.getSize()
                    }}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler()
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽'
                      }[header.column.getIsSorted() as string] ?? null}
                      {header.column.getCanFilter() && (
                        <div>
                          <Filter column={header.column} />
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <TableBody
          table={table}
          tableContainerRef={tableContainerRef as RefObject<HTMLDivElement>}
        />
      </table>
    </div>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta as any;

  if (filterVariant === 'range') {
    return (
      <div>
        <div className='flex space-x-2'>
          <DebouncedInput
            type='number'
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder='Min'
            className='w-24 border shadow rounded'
          />
          <DebouncedInput
            type='number'
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder='Max'
            className='w-24 border shadow rounded'
          />
        </div>
        <div className='h-1' />
      </div>
    );
  } else if (filterVariant === 'select') {
    return (
      <select
        onChange={(e) => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
      >
        <option value=''>All</option>
        <option value='complicated'>complicated</option>
        <option value='relationship'>relationship</option>
        <option value='single'>single</option>
      </select>
    );
  } else {
    return (
      <DebouncedInput
        className='w-36 border shadow rounded'
        onChange={(value) => column.setFilterValue(value)}
        placeholder='Search...'
        type='text'
        value={(columnFilterValue ?? '') as string}
      />
    );
  }
}

interface TableBodyProps {
  table: Table<IOlympicData>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
}

function TableBody({ table, tableContainerRef }: TableBodyProps) {
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5
  });

  return (
    <tbody
      style={{
        display: 'grid',
        height: `${rowVirtualizer.getTotalSize()}px`,
        position: 'relative'
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<IOlympicData>;
        return (
          <TableBodyRow
            key={row.id}
            row={row}
            virtualRow={virtualRow}
            rowVirtualizer={rowVirtualizer}
          />
        );
      })}
    </tbody>
  );
}

interface TableBodyRowProps {
  row: Row<IOlympicData>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
}

function TableBodyRow({ row, virtualRow, rowVirtualizer }: TableBodyRowProps) {
  return (
    <tr
      data-index={virtualRow.index}
      ref={(node) => rowVirtualizer.measureElement(node)}
      key={row.id}
      style={{
        display: 'flex',
        position: 'absolute',
        transform: `translateY(${virtualRow.start}px)`,
        width: '100%'
      }}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <td
            key={cell.id}
            style={{
              display: 'flex',
              width: cell.column.getSize()
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
}
