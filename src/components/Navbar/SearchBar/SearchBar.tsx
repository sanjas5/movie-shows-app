import { useSearch } from "../../../context/SearchContext";
import "./searchBar.css";

function SearchBar() {
  const { searchTerm, handleInputChange } = useSearch();

  return (
    <div>
      <div className="searchBarContainer">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          className="searchBarInput"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default SearchBar;
