import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

jest.mock("../../../context/SearchContext", () => ({
  __esModule: true,
  useSearch: jest.fn(),
}));

describe("SearchBar", () => {
  it("should update search term when input value changes", () => {
    const mockSearchTerm = "test search";
    const mockHandleInputChange = jest.fn();

    require("../../../context/SearchContext").useSearch.mockReturnValue({
      searchTerm: mockSearchTerm,
      handleInputChange: mockHandleInputChange,
    });

    render(<SearchBar />);

    const inputElement = screen.getByPlaceholderText("Search...");

    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
    expect(mockHandleInputChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
