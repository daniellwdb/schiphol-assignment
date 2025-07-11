import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Schiphol" },
    { name: "description", content: "Frontend Assignment" },
  ];
};

export default function Index() {
  return "hello";
}
