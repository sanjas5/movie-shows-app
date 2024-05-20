import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useSearch } from "../../../context/SearchContext";
import Tabs from "./Tabs";

jest.mock("../../../context/SearchContext", () => ({
  useSearch: jest.fn(),
}));

describe("Tabs", () => {
  it("renders Tabs with Movies and TV Shows links", () => {
    (useSearch as jest.Mock).mockReturnValue({
      currentTab: "movies",
      handleTabChange: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Tabs />
      </MemoryRouter>,
    );

    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("TV Shows")).toBeInTheDocument();
  });

  it("applies the active class to the Movies tab when currentTab is 'movies'", () => {
    (useSearch as jest.Mock).mockReturnValue({
      currentTab: "movies",
      handleTabChange: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Tabs />
      </MemoryRouter>,
    );

    const moviesTab = screen.getByText("Movies");
    expect(moviesTab).toHaveClass("activeMoviesTab");
  });

  it("applies the active class to the TV Shows tab when currentTab is 'shows'", () => {
    (useSearch as jest.Mock).mockReturnValue({
      currentTab: "shows",
      handleTabChange: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Tabs />
      </MemoryRouter>,
    );

    const showsTab = screen.getByText("TV Shows");
    expect(showsTab).toHaveClass("activeShowsTab");
  });

  it("calls handleTabChange with 'movies' when the Movies tab is clicked", () => {
    const handleTabChange = jest.fn();
    (useSearch as jest.Mock).mockReturnValue({
      currentTab: "shows",
      handleTabChange,
    });

    render(
      <MemoryRouter>
        <Tabs />
      </MemoryRouter>,
    );

    const moviesTab = screen.getByText("Movies");
    fireEvent.click(moviesTab);
    expect(handleTabChange).toHaveBeenCalledWith("movies");
  });

  it("calls handleTabChange with 'shows' when the TV Shows tab is clicked", () => {
    const handleTabChange = jest.fn();
    (useSearch as jest.Mock).mockReturnValue({
      currentTab: "movies",
      handleTabChange,
    });

    render(
      <MemoryRouter>
        <Tabs />
      </MemoryRouter>,
    );

    const showsTab = screen.getByText("TV Shows");
    fireEvent.click(showsTab);
    expect(handleTabChange).toHaveBeenCalledWith("shows");
  });
});
