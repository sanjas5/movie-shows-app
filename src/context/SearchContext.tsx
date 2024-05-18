import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  ChangeEvent,
  useCallback,
} from "react";
import {
  fetchMoviesSearchResults,
  fetchShowsSearchResults,
} from "../utils/fetchData";
import { IMovie } from "../entities/IMovie";
import { IShow } from "../entities/IShow";

interface ISearchContext {
  searchTerm: string;
  updateSearchTerm: (term: string) => void;
  searchMoviesResults: IMovie[];
  searchShowsResults: IShow[];
  currentTab: string;
  totalResults: number | null;
  loading: boolean;
  handleTabChange: (tab: string) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchContext = createContext<ISearchContext | undefined>(undefined);
export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchMoviesResults, setSearchMoviesResults] = useState<IMovie[]>([]);
  const [searchShowsResults, setSearchShowsResults] = useState<IShow[]>([]);
  const [currentTab, setCurrentTab] = useState<string>(
    window.location.pathname.slice(1),
  );
  const [totalResults, setTotalResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    updateSearchTerm(newSearchTerm);
  };

  const handleFetchMovies = useCallback(() => {
    setLoading(true);
    fetchMoviesSearchResults(
      searchTerm,
      setSearchMoviesResults,
      setTotalResults,
      setLoading,
    );
  }, [searchTerm, setTotalResults, setLoading]);

  const handleFetchShows = useCallback(() => {
    setLoading(true);
    fetchShowsSearchResults(
      searchTerm,
      setSearchShowsResults,
      setTotalResults,
      setLoading,
    );
  }, [searchTerm, setSearchShowsResults, setTotalResults, setLoading]);

  useEffect(() => {
    if (currentTab === "") {
      setCurrentTab("shows");
    }
  }, [currentTab]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (currentTab === "shows") {
      if (searchTerm.length >= 3) {
        timerId = setTimeout(handleFetchShows, 1000);
      } else {
        setSearchShowsResults([]);
      }
      fetchShowsSearchResults(
        searchTerm,
        setSearchShowsResults,
        setTotalResults,
        setLoading,
      );
    } else if (currentTab === "movies") {
      if (searchTerm.length >= 3) {
        timerId = setTimeout(handleFetchMovies, 1000);
      } else {
        setSearchMoviesResults([]);
      }
      fetchMoviesSearchResults(
        searchTerm,
        setSearchMoviesResults,
        setTotalResults,
        setLoading,
      );
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [currentTab, handleFetchMovies, handleFetchShows, searchTerm]);

  const value: ISearchContext = {
    searchTerm,
    updateSearchTerm,
    searchMoviesResults,
    searchShowsResults,
    currentTab,
    totalResults,
    loading,
    handleTabChange,
    handleInputChange,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = (): ISearchContext => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
