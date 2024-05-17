import noResults from "../../assets/noResults.png";
import Navbar from "../Navbar/Navbar";
import "./emptyPage.css";

function EmptyPage() {
  return (
    <div className="emptyPageContainer">
      <Navbar />
      <div className="emptyPageContent">
        <img src={noResults} alt="" />
        Nothing to load. Sorry...
      </div>
    </div>
  );
}

export default EmptyPage;
