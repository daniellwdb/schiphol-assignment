import type { MetaFunction } from "@remix-run/node";
import { flights as flightsData } from "../flights.json";
import { useLoaderData } from "@remix-run/react";
import { FlightsTable } from "~/components/flights-table/flights-table";
import { Card } from "~/components/card/card";
import { getTableColumns } from "~/components/flights-table/get-table-columns";

export const meta: MetaFunction = () => {
  return [
    { title: "Schiphol" },
    { name: "description", content: "Frontend Assignment" },
  ];
};

export const loader = async () => {
  return flightsData;
};

export default function Index() {
  const flights = useLoaderData<typeof loader>();

  return (
    <main>
      <section>
        <Card title="Flight departure information">
          <FlightsTable columns={getTableColumns()} flights={flights} />
        </Card>
      </section>
    </main>
  );
}
