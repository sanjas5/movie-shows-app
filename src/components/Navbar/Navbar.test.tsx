import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

jest.mock("./Tabs/Tabs", () => {
  return function Tabs() {
    return <div>Tabs Component</div>;
  };
});

jest.mock("./SearchBar/SearchBar.tsx", () => {
  return function SearchBar() {
    return <div>SearchBar Component</div>;
  };
});

describe("Navbar", () => {
  it("renders Tabs component", () => {
    render(<Navbar />);
    expect(screen.getByText("Tabs Component")).toBeInTheDocument();
  });

  it("renders SearchBar component", () => {
    render(<Navbar />);
    expect(screen.getByText("SearchBar Component")).toBeInTheDocument();
  });
});
