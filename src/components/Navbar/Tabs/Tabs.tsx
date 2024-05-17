import { Link } from "react-router-dom";
import { useSearch } from "../../../context/SearchContext";
import "./tabs.css";

function Tabs() {
  const { currentTab, handleTabChange } = useSearch();

  return (
    <div className="tabsContainer">
      <Link
        to="/movies"
        className={`${
          currentTab === "movies" ? "activeMoviesTab moviesTab" : "moviesTab"
        }`}
        onClick={() => handleTabChange("movies")}
      >
        Movies
      </Link>
      <Link
        to="/shows"
        className={`${
          currentTab === "shows" ? "activeShowsTab showsTab" : "showsTab"
        }`}
        onClick={() => handleTabChange("shows")}
      >
        TV Shows
      </Link>
    </div>
  );
}

export default Tabs;
