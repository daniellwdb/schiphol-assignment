import { createColumnHelper } from "@tanstack/react-table";
import { loader } from "~/routes/_index";

const columnHelper =
  createColumnHelper<Awaited<ReturnType<typeof loader>>[number]>();

export function getTableColumns() {
  return [
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
}
