import Skeleton from "react-loading-skeleton";
import { useSearch } from "../../context/SearchContext";
import { IShow } from "../../entities/IShow";
import noImage from "../../assets/noImage.png";
import EmptyPage from "../EmptyPage/EmptyPage";
import Navbar from "../Navbar/Navbar";
import "./moviesShowsPage.css";

function ShowsPage() {
  const { searchShowsResults, totalResults, loading } = useSearch();

  if (totalResults === 0) return <EmptyPage />;

  if (loading)
    return (
      <div data-testid="skeleton-loader">
        <Skeleton count={3} />
      </div>
    );
  return (
    <div className="mediaPage">
      <Navbar />
      <div className="moviesShowsContainer">
        {searchShowsResults.map((show: IShow, index: number) => (
          <a href={`/tv/${show.id}`} key={index}>
            <div className="moviesShowsContent">
              {show.poster_path ? (
                <img
                  className="mediaImg"
                  src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                  alt="show"
                />
              ) : (
                <img className="mediaImg" src={noImage} alt="show" />
              )}
              <div className="mediaTitle">{show.name}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ShowsPage;
