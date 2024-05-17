import { useSearch } from "../../context/SearchContext";
import { IShow } from "../../entities/IShow";
import EmptyPage from "../EmptyPage/EmptyPage";
import Navbar from "../Navbar/Navbar";
import "./moviesShowsPage.css";

function ShowsPage() {
  const { searchShowsResults, totalResults } = useSearch();

  if (totalResults === 0) return <EmptyPage />;

  return (
    <div className="mediaPage">
      <Navbar />
      <div className="moviesShowsContainer">
        {searchShowsResults.map((movie: IShow, index: number) => (
          <a href={`/tv/${movie.id}`} key={index}>
            <div className="moviesShowsContent">
              <img
                className="movieImg"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="movie"
              />
              <div className="mediaTitle">{movie.name}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ShowsPage;
