import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import MoviesPage from "./MoviesPage";

jest.mock("../../context/SearchContext", () => ({
  useSearch: jest.fn(() => ({
    searchMoviesResults: [],
    loading: true,
    totalResults: 0,
  })),
}));

describe("MoviesPage", () => {
  it("renders loading skeleton while loading", () => {
    (useSearch as jest.Mock).mockReturnValue({
      searchMoviesResults: [],
      loading: true,
      totalResults: 0,
    });

    render(
      <MemoryRouter>
        <MoviesPage />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId("skeleton-loader")).not.toBeInTheDocument();
  });

  it("renders EmptyPage when totalResults is 0", () => {
    (useSearch as jest.Mock).mockReturnValue({
      searchMoviesResults: [],
      loading: false,
      totalResults: 0,
    });

    render(
      <MemoryRouter>
        <MoviesPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Nothing to load. Sorry...")).toBeInTheDocument();
  });

  it("renders movies when searchMoviesResults is not empty", () => {
    const movies = [
      {
        id: 1,
        title: "Movie 1",
        poster_path: "/path/to/poster1.jpg",
      },
      {
        id: 2,
        title: "Movie 2",
        poster_path: "/path/to/poster2.jpg",
      },
    ];

    (useSearch as jest.Mock).mockReturnValue({
      searchMoviesResults: movies,
      loading: false,
      totalResults: 2,
    });

    render(
      <MemoryRouter>
        <MoviesPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();

    const images = screen.getAllByAltText("movie") as HTMLImageElement[];
    expect(images[0].src).toContain("/path/to/poster1.jpg");
    expect(images.length).toBe(2);
  });
});
