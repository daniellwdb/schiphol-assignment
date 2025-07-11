import type { MetaFunction } from "@remix-run/node";
import { flights as flightsData } from "../flights.json";
import { useLoaderData } from "@remix-run/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DebouncedInput } from "~/components/debounced-input";
import { fuzzyFilter } from "lib/util/table-filters";

export const meta: MetaFunction = () => {
  return [
    { title: "Schiphol" },
    { name: "description", content: "Frontend Assignment" },
  ];
};

export const loader = async () => {
  return flightsData;
};

const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof loader>>[number]>();

const MAX_TABLE_ROWS = 5;

export default function Index() {
  const flights = useLoaderData<typeof loader>();

  const columns = [
    {
      accessorKey: "airport",
      filterFn: "fuzzy" as const,
    },
    columnHelper.accessor("flightNumber", {
      header: () => <span>Flight</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: () => <span>Date</span>,
      cell: (info) => info.getValue(),
      sortingFn: "datetime",
    }),
    columnHelper.accessor("originalTime", {
      header: () => <span>Original Departure</span>,
      cell: (info) => info.getValue(),
      sortingFn: "datetime",
    }),
    columnHelper.accessor("expectedTime", {
      header: () => <span>Expected Departure</span>,
      cell: (info) => info.getValue(),
      sortingFn: "datetime",
    }),
  ];

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
  });

  const column = table.getColumn("airport")!;
  const filterValue = column.getFilterValue() as string | undefined;

  return (
    <main>
      <div className="card-container center">
        <section>
          <h2 className="card-title">Flight departure information</h2>
          <div className="center">
            <DebouncedInput
              className="flights-search-input"
              type="text"
              value={filterValue ?? ""}
              onChange={(value) => column.setFilterValue(value)}
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
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: " 🔼",
                                  desc: " 🔽",
                                }[header.column.getIsSorted() as string] ??
                                  null}
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
                  .rows.slice(0, MAX_TABLE_ROWS)
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
        </section>
      </div>
    </main>
  );
}
