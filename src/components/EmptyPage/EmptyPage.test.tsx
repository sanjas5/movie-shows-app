import { render, screen } from "@testing-library/react";
import EmptyPage from "./EmptyPage";

jest.mock("../Navbar/Navbar", () => {
  return function Navbar() {
    return <div>Navbar Component</div>;
  };
});

describe("EmptyPage", () => {
  it("renders the Navbar component", () => {
    render(<EmptyPage />);
    expect(screen.getByText("Navbar Component")).toBeInTheDocument();
  });

  it("displays 'Nothing to load. Sorry...'", () => {
    render(<EmptyPage />);
    expect(screen.getByText("Nothing to load. Sorry...")).toBeInTheDocument();
  });

  it("displays the no results image", () => {
    render(<EmptyPage />);
    expect(screen.getByAltText("no results")).toBeInTheDocument();
  });
});
