import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { IMovie } from "../../entities/IMovie";
import { IYouTubeTrailer } from "../../entities/IYouTubeTrailer";
import { getMovie } from "../../utils/fetchData";
import BackButton from "../BackButton/BackButton";
import noImage from "../../assets/noImage.png";
import "./mediaDetails.css";

const MovieDetails = () => {
  const [movie, setMovie] = useState<IMovie>();
  const [trailer, setTrailer] = useState<IYouTubeTrailer[]>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getMovie(id, setMovie, setTrailer, setLoading);
  }, [id]);

  const officialTrailer = trailer;
  trailer?.filter(
    (item: IYouTubeTrailer) =>
      item.site === "YouTube" && item.name.toLowerCase().includes("trailer"),
  );

  return (
    <div>
      {loading ? (
        <div data-testid="skeleton-loader">
          <Skeleton count={3} />
        </div>
      ) : (
        <div className="mediaContainer">
          <div className="mediaContent">
            <BackButton />
            {officialTrailer?.length ? (
              <iframe
                className="trailerContent"
                title={officialTrailer[0].name}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${officialTrailer[0].key}`}
              ></iframe>
            ) : movie?.backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
                alt="movie"
              />
            ) : (
              <img src={noImage} alt="movie" />
            )}
            <div className="mediaOverviewContent">
              <h1 className="mediaTitle">{movie?.title}</h1>
              <p className="mediaOverview">{movie?.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
