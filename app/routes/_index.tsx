import type { MetaFunction } from "@remix-run/node";
import { flights as flightsData } from "../flights.json";
import { useLoaderData } from "@remix-run/react";
import { createColumnHelper } from "@tanstack/react-table";
import { FlightsTable } from "~/components/flights-table/flights-table";

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

export default function Index() {
  const flights = useLoaderData<typeof loader>();

  return (
    <main>
      <div className="card-container center">
        <section>
          <h2 className="card-title">Flight departure information</h2>

          <FlightsTable columns={columns} flights={flights} />
        </section>
      </div>
    </main>
  );
}
