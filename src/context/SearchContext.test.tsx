import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchProvider, useSearch } from "./SearchContext";

jest.mock("../utils/fetchData", () => ({
  fetchMoviesSearchResults: jest.fn(),
  fetchShowsSearchResults: jest.fn(),
}));

describe("SearchProvider", () => {
  const TestComponent: React.FC = () => {
    const {
      searchTerm,
      updateSearchTerm,
      currentTab,
      totalResults,
      loading,
      handleTabChange,
      handleInputChange,
    } = useSearch();

    return (
      <div>
        <span data-testid="search-term">{searchTerm}</span>
        <span data-testid="current-tab">{currentTab}</span>
        <span data-testid="total-results">{totalResults}</span>
        <span data-testid="loading">{loading ? "Loading" : "Not loading"}</span>
        <button onClick={() => handleTabChange("movies")}>
          Change to Movies
        </button>
        <button onClick={() => handleTabChange("shows")}>
          Change to Shows
        </button>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        <button onClick={() => updateSearchTerm("test")}>
          Update Search Term
        </button>
      </div>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children and default context values", () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>,
    );

    expect(screen.getByTestId("search-term")).toHaveTextContent("");
    expect(screen.getByTestId("current-tab")).toHaveTextContent("shows");
    expect(screen.getByTestId("total-results")).toHaveTextContent("");
    expect(screen.getByTestId("loading")).toHaveTextContent("Loading");
  });
});
