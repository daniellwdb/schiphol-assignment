import { render, screen, waitFor } from "@testing-library/react";
import { FlightsTable } from "./flights-table";
import { getTableColumns } from "./get-table-columns";
import userEvent from "@testing-library/user-event";

describe("FlightsTable", () => {
  let flightsTableContainer: HTMLElement;

  beforeEach(() => {
    const { container } = render(
      <FlightsTable
        columns={getTableColumns()}
        flights={[
          {
            flightIdentifier: "TEST",
            flightNumber: "TEST 123",
            airport: "San Francisco",
            date: "2022-01-01",
            expectedTime: "12:00",
            originalTime: "12:00",
            url: "/en/departures/flight/TEST/",
            score: "10.00000",
          },
        ]}
      />
    );

    flightsTableContainer = container;
  });

  it("renders", () => {
    expect(
      flightsTableContainer.querySelector(`input[name="flights-search-input"]`)
    ).toBeInTheDocument();
  });

  it("does not show results without input", () => {
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("does not show results without matching input", async () => {
    const user = userEvent.setup();

    const input = flightsTableContainer.querySelector(
      `input[name="flights-search-input"]`
    );

    assert(input instanceof HTMLInputElement);

    await user.type(input, "Amsterdam");

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("does not show results when input is too short", async () => {
    const user = userEvent.setup();

    const input = flightsTableContainer.querySelector(
      `input[name="flights-search-input"]`
    );

    assert(input instanceof HTMLInputElement);

    await user.clear(input);
    await user.type(input, "Sa");

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("shows results with matching input", async () => {
    const user = userEvent.setup();

    const input = flightsTableContainer.querySelector(
      `input[name="flights-search-input"]`
    );

    assert(input instanceof HTMLInputElement);

    await user.clear(input);
    await user.type(input, "San");

    // Timeout due to debounce
    await waitFor(() => expect(screen.queryByRole("table")), { timeout: 500 });
  });
});
