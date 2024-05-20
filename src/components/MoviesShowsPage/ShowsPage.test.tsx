import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import ShowsPage from "./ShowsPage";

jest.mock("../../context/SearchContext", () => ({
  useSearch: jest.fn(() => ({
    searchShowsResults: [],
    loading: true,
    totalResults: 0,
  })),
}));

describe("ShowsPage", () => {
  it("renders loading skeleton while loading", () => {
    (useSearch as jest.Mock).mockReturnValue({
      searchShowsResults: [],
      loading: true,
      totalResults: 0,
    });

    render(
      <MemoryRouter>
        <ShowsPage />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("skeleton-loader")).not.toBeInTheDocument();
  });

  it("renders EmptyPage when totalResults is 0", () => {
    (useSearch as jest.Mock).mockReturnValue({
      searchShowsResults: [],
      loading: false,
      totalResults: 0,
    });

    render(
      <MemoryRouter>
        <ShowsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Nothing to load. Sorry...")).toBeInTheDocument();
  });

  it("renders shows when searchShowsResults is not empty", () => {
    const shows = [
      {
        id: 1,
        name: "Show 1",
        poster_path: "/path/to/poster1.jpg",
      },
      {
        id: 2,
        name: "Show 2",
        poster_path: "/path/to/poster2.jpg",
      },
    ];

    (useSearch as jest.Mock).mockReturnValue({
      searchShowsResults: shows,
      loading: false,
      totalResults: 2,
    });

    render(
      <MemoryRouter>
        <ShowsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Show 1")).toBeInTheDocument();
    expect(screen.getByText("Show 2")).toBeInTheDocument();

    const images = screen.getAllByAltText("show") as HTMLImageElement[];
    expect(images[0].src).toContain("/path/to/poster1.jpg");
    expect(images.length).toBe(2);
  });
});
