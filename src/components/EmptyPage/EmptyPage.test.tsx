import { render, screen, waitFor } from "@testing-library/react";
import EmptyPage from "./EmptyPage";

jest.mock("../Navbar/Navbar", () => () => <div>Navbar</div>);

describe("EmptyPage", () => {
  it("renders the Navbar component", () => {
    render(<EmptyPage />);
    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  it("displays the no results image", async () => {
    render(<EmptyPage />);
    const img = screen.getByAltText("no results");

    await waitFor(() => {
      expect(img).toBeInTheDocument();
    });
  });

  it("displays the 'Nothing to load. Sorry...' message", () => {
    render(<EmptyPage />);
    expect(screen.getByText("Nothing to load. Sorry...")).toBeInTheDocument();
  });
});
