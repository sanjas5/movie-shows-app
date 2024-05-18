import axios from "axios";
import { IMovie } from "../entities/IMovie";
import { IShow } from "../entities/IShow";
import { IYouTubeTrailer } from "../entities/IYouTubeTrailer";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getMovie = async (
  id: string | undefined,
  setMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>,
  setTrailer: React.Dispatch<
    React.SetStateAction<IYouTubeTrailer[] | undefined>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${id}?api_key=${apiKey}`,
    );
    const trailerResponse = await axios.get(
      `${baseUrl}/movie/${id}/videos?api_key=${apiKey}`,
    );
    setMovie(response.data);
    setTrailer(trailerResponse?.data?.results);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching movie:", error);
  }
};

export const getShow = async (
  id: string | undefined,
  setShow: React.Dispatch<React.SetStateAction<IShow | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const response = await axios.get(`${baseUrl}/tv/${id}?api_key=${apiKey}`);
    setShow(response.data);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching show:", error);
  }
};

export const fetchMoviesSearchResults = async (
  searchTerm: string,
  setSearchMoviesResults: React.Dispatch<React.SetStateAction<IMovie[]>>,
  setTotalResults: React.Dispatch<React.SetStateAction<null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const url =
      searchTerm && searchTerm.length >= 3
        ? `${baseUrl}/search/movie?query=${searchTerm}&api_key=${apiKey}`
        : `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${apiKey}`;

    const responseMovies = await axios.get(url);
    setSearchMoviesResults(
      searchTerm && searchTerm.length >= 3
        ? responseMovies.data.results
        : responseMovies.data.results.splice(0, 10),
    );
    setTotalResults(responseMovies.data.total_results);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching movie search results:", error);
    setSearchMoviesResults([]);
  }
};

export const fetchShowsSearchResults = async (
  searchTerm: string,
  setSearchShowsResults: React.Dispatch<React.SetStateAction<IShow[]>>,
  setTotalResults: React.Dispatch<React.SetStateAction<null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const url =
      searchTerm && searchTerm.length >= 3
        ? `${baseUrl}/search/tv?query=${searchTerm}&api_key=${apiKey}`
        : `${baseUrl}/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200&api_key=${apiKey}`;

    const responseShows = await axios.get(url);
    setSearchShowsResults(
      searchTerm && searchTerm.length >= 3
        ? responseShows.data.results
        : responseShows.data.results.splice(0, 10),
    );
    setTotalResults(responseShows.data.total_results);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching show search results:", error);
    setSearchShowsResults([]);
  }
};
