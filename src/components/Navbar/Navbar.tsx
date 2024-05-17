import SearchBar from "./SearchBar/SearchBar";
import Tabs from "./Tabs/Tabs";
import "./navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <Tabs />
      <SearchBar />
    </div>
  );
}

export default Navbar;
