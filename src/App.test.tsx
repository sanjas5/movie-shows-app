import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./components/DetailsPage/MovieDetails", () => {
  const MovieDetails = () => <div>Movie Details</div>;
  MovieDetails.displayName = "Movie Details";
  return MovieDetails;
});

jest.mock("./components/DetailsPage/ShowDetails", () => {
  const ShowDetails = () => <div>Show Details</div>;
  ShowDetails.displayName = "Show Details";
  return ShowDetails;
});

jest.mock("./components/MoviesShowsPage/ShowsPage", () => {
  const ShowsPage = () => <div>Shows Page</div>;
  ShowsPage.displayName = "Shows Page";
  return ShowsPage;
});

jest.mock("./components/MoviesShowsPage/MoviesPage", () => {
  const MoviesPage = () => <div>Movies Page</div>;
  MoviesPage.displayName = "Movies Page";
  return MoviesPage;
});

describe("App", () => {
  it("renders ShowsPage when the path is '/shows'", () => {
    render(
      <MemoryRouter initialEntries={["/shows"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Shows Page")).toBeInTheDocument();
  });

  it("renders MoviesPage when the path is '/movies'", () => {
    render(
      <MemoryRouter initialEntries={["/movies"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Movies Page")).toBeInTheDocument();
  });

  it("renders MovieDetails when the path is '/movies/:id'", () => {
    render(
      <MemoryRouter initialEntries={["/movies/123"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Movie Details")).toBeInTheDocument();
  });

  it("renders ShowDetails when the path is '/tv/:id'", () => {
    render(
      <MemoryRouter initialEntries={["/tv/456"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Show Details")).toBeInTheDocument();
  });

  it("navigates to ShowsPage when the path is '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText("Shows Page")).toBeInTheDocument();
  });
});
