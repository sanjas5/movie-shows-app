import axios from "axios";
import { IMovie } from "../entities/IMovie";
import { IShow } from "../entities/IShow";
import { IYouTubeTrailer } from "../entities/IYouTubeTrailer";
import {
  fetchMoviesSearchResults,
  fetchShowsSearchResults,
  getMovie,
  getShow,
} from "./fetchData";

jest.mock("axios");

describe("getMovie", () => {
  it("fetches movie and trailer data and updates state accordingly", async () => {
    const setMovie = jest.fn();
    const setTrailer = jest.fn();
    const setLoading = jest.fn();

    const movieData: IMovie = {
      id: 123,
      title: "Test Movie",
      poster_path: "",
      backdrop_path: "",
      overview: "",
    };
    const trailerData: IYouTubeTrailer[] = [
      {
        id: "1",
        name: "Trailer 1",
        key: "",
        site: "",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: movieData });
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { results: trailerData },
    });

    await getMovie("123", setMovie, setTrailer, setLoading);

    expect(setMovie).toHaveBeenCalledWith(movieData);
    expect(setTrailer).toHaveBeenCalledWith(trailerData);
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});

describe("getShow", () => {
  it("fetches show data and updates state accordingly", async () => {
    const setShow = jest.fn();
    const setLoading = jest.fn();

    const showData: IShow = {
      id: 456,
      name: "Test Show",
      poster_path: "",
      backdrop_path: "",
      overview: "",
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: showData });

    await getShow("456", setShow, setLoading);

    expect(setShow).toHaveBeenCalledWith(showData);
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});

describe("fetchMoviesSearchResults", () => {
  it("fetches movie search results and updates state accordingly", async () => {
    const setSearchMoviesResults = jest.fn();
    const setTotalResults = jest.fn();
    const setLoading = jest.fn();

    const searchMoviesData: IMovie[] = [
      {
        id: 1,
        title: "Movie 1",
        poster_path: "",
        backdrop_path: "",
        overview: "",
      },
    ];
    const totalResults = 1;

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { results: searchMoviesData, total_results: totalResults },
    });

    await fetchMoviesSearchResults(
      "test",
      setSearchMoviesResults,
      setTotalResults,
      setLoading,
    );

    expect(setSearchMoviesResults).toHaveBeenCalledWith(searchMoviesData);
    expect(setTotalResults).toHaveBeenCalledWith(totalResults);
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});

describe("fetchShowsSearchResults", () => {
  it("fetches show search results and updates state accordingly", async () => {
    const setSearchShowsResults = jest.fn();
    const setTotalResults = jest.fn();
    const setLoading = jest.fn();

    const searchShowsData: IShow[] = [
      {
        id: 1,
        name: "Show 1",
        poster_path: "",
        backdrop_path: "",
        overview: "",
      },
    ];
    const totalResults = 1;

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { results: searchShowsData, total_results: totalResults },
    });

    await fetchShowsSearchResults(
      "test",
      setSearchShowsResults,
      setTotalResults,
      setLoading,
    );

    expect(setSearchShowsResults).toHaveBeenCalledWith(searchShowsData);
    expect(setTotalResults).toHaveBeenCalledWith(totalResults);
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});
