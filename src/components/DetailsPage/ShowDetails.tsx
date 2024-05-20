import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { IShow } from "../../entities/IShow";
import { getShow } from "../../utils/fetchData";
import BackButton from "../BackButton/BackButton";
import noImage from "../../assets/noImage.png";
import "./mediaDetails.css";

function ShowDetails() {
  const [show, setShow] = useState<IShow>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getShow(id, setShow, setLoading);
  }, [id]);

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
            <div className="showImage">
              {show?.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${show?.backdrop_path}`}
                  alt="show"
                />
              ) : (
                <img src={noImage} alt="show" />
              )}
            </div>
            <div className="mediaOverviewContent">
              <h1 className="mediaTitle">{show?.name}</h1>
              <p className="mediaOverview">{show?.overview}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowDetails;
