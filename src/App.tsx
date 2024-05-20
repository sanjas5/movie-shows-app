import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { SearchProvider } from "./context/SearchContext";
import MovieDetails from "./components/DetailsPage/MovieDetails";
import ShowDetails from "./components/DetailsPage/ShowDetails";
import ShowsPage from "./components/MoviesShowsPage/ShowsPage";
import MoviesPage from "./components/MoviesShowsPage/MoviesPage";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/shows" replace={true} />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/shows" element={<ShowsPage />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<ShowDetails />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;
