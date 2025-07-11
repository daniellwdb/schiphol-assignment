import type { MetaFunction } from "@remix-run/node";
import { flights as flightsData } from "../flights.json";
import { useLoaderData } from "@remix-run/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
    columnHelper.accessor("flightNumber", {
      header: () => <span>Flight</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: () => <span>Date</span>,
      cell: (info) => info.getValue(),
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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <main>
      <section>
        <div>
          <input type="text" placeholder="Enter your destination" />
        </div>

        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th>
                  {headerGroup.headers.map((header) =>
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </th>
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
      </section>
    </main>
  );
}
