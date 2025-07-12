import { createRemixStub } from "@remix-run/testing";
import { render, screen } from "@testing-library/react";
import Index from "./_index";

describe("Index", async () => {
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component: Index,
      loader() {
        return [
          {
            flightNumber: "TEST 123",
            date: "2022-01-01",
            originalTime: "10:00",
            expectedTime: "10:00",
          },
        ];
      },
    },
  ]);

  render(<RemixStub />);

  it("renders", async () => {
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
