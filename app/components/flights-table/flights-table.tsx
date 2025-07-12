import "./flights-table.css";
import {
  AccessorKeyColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { flights } from "../../flights.json";
import { useState } from "react";
import { DebouncedInput } from "../debounced-input";
import { fuzzyFilter } from "lib/shared/util/filters/fuzzy-filter";

type FlightsTableProps = {
  flights: typeof flights;
  columns: AccessorKeyColumnDef<(typeof flights)[number], string>[];
  maxRows?: number;
};

export function FlightsTable({
  maxRows = 5,
  columns,
  flights,
}: FlightsTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data: flights,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      sorting: [
        {
          id: "expectedTime",
          desc: false,
        },
      ],
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  const airportColumn = table.getColumn("airport");
  const filterValue = airportColumn?.getFilterValue() as string | undefined;

  return (
    <>
      <div className="center">
        <DebouncedInput
          name="flights-search-input"
          className="flights-search-input"
          type="text"
          value={filterValue ?? ""}
          onChange={(value) => airportColumn?.setFilterValue(value)}
          placeholder="Enter your destination"
        />
      </div>

      {filterValue?.length && filterValue.length >= 3 && (
        <table className="center">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            aria-hidden="true"
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, maxRows)
              .map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}
