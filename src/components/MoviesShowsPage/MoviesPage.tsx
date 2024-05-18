import Skeleton from "react-loading-skeleton";
import { useSearch } from "../../context/SearchContext";
import { IMovie } from "../../entities/IMovie";
import EmptyPage from "../EmptyPage/EmptyPage";
import Navbar from "../Navbar/Navbar";
import noImage from "../../assets/noImage.png";
import "./moviesShowsPage.css";

function MoviesPage() {
  const { searchMoviesResults, loading, totalResults } = useSearch();

  if (totalResults === 0) return <EmptyPage />;
  if (loading) return <Skeleton count={3} />;

  return (
    <div className="mediaPage">
      <Navbar />
      <div className="moviesShowsContainer">
        {searchMoviesResults.map((movie: IMovie, index: number) => (
          <a href={`/movies/${movie.id}`} key={index}>
            <div className="moviesShowsContent">
              {movie.poster_path ? (
                <img
                  className="mediaImg"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="movie"
                />
              ) : (
                <img className="mediaImg" src={noImage} alt="movie" />
              )}

              <div className="mediaTitle">{movie.title}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;
