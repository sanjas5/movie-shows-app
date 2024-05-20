import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { getMovie } from "../../utils/fetchData";
import { IMovie } from "../../entities/IMovie";
import { IYouTubeTrailer } from "../../entities/IYouTubeTrailer";
import MovieDetails from "./MovieDetails";

jest.mock("../../utils/fetchData", () => ({
  getMovie: jest.fn(),
}));

jest.mock("../BackButton/BackButton", () => {
  const BackButton = () => <div>BackButton Component</div>;
  BackButton.displayName = "BackButton Component";
  return BackButton;
});

const mockMovie: IMovie = {
  id: 1,
  title: "Test Movie",
  overview: "Test Overview",
  backdrop_path: "/test.jpg",
  poster_path: "",
};

const mockTrailer: IYouTubeTrailer[] = [
  {
    id: "1",
    name: "Test Trailer",
    key: "testkey",
    site: "YouTube",
  },
];

describe("MovieDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the skeleton loader while loading", () => {
    (getMovie as jest.Mock).mockImplementation(
      (_id, setMovie, setTrailer, setLoading) => {
        setLoading(true);
      },
    );

    render(
      <MemoryRouter initialEntries={["/movies/1"]}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument();
  });

  it("renders movie details once loaded", async () => {
    (getMovie as jest.Mock).mockImplementation(
      (_id, setMovie, setTrailer, setLoading) => {
        setMovie(mockMovie);
        setTrailer(mockTrailer);
        setLoading(false);
      },
    );

    render(
      <MemoryRouter initialEntries={["/movies/1"]}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.queryByTestId("skeleton-loader")).not.toBeInTheDocument(),
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Test Overview")).toBeInTheDocument();
    expect(screen.getByTitle("Test Trailer")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/testkey",
    );
  });

  it("renders default text when no trailer or backdrop_path is available", async () => {
    const mockMovieWithoutImage = { ...mockMovie, backdrop_path: null };

    (getMovie as jest.Mock).mockImplementation(
      (_id, setMovie, setTrailer, setLoading) => {
        setMovie(mockMovieWithoutImage);
        setTrailer([]);
        setLoading(false);
      },
    );

    render(
      <MemoryRouter initialEntries={["/movies/1"]}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.queryByTestId("skeleton-loader")).not.toBeInTheDocument(),
    );

    expect(screen.getByAltText("movie")).toHaveAttribute("alt", "movie");
  });

  it("uses the correct id from useParams", () => {
    (getMovie as jest.Mock).mockImplementation(
      (id, setMovie, setTrailer, setLoading) => {
        setMovie(mockMovie);
        setTrailer(mockTrailer);
        setLoading(false);
      },
    );

    render(
      <MemoryRouter initialEntries={["/movies/123"]}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(getMovie).toHaveBeenCalledWith(
      "123",
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    );
  });
});
