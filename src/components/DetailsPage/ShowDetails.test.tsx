import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ShowDetails from "./ShowDetails";
import { getShow } from "../../utils/fetchData";
import { IShow } from "../../entities/IShow";

jest.mock("../../utils/fetchData", () => ({
  getShow: jest.fn(),
}));

jest.mock("../BackButton/BackButton", () => () => <div>Back Button</div>);

const mockShow: IShow = {
  id: 1,
  name: "Test Show",
  overview: "Test Overview",
  backdrop_path: "/test.jpg",
  poster_path: "",
};

describe("ShowDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the skeleton loader while loading", () => {
    (getShow as jest.Mock).mockImplementation((_id, setShow, setLoading) => {
      setLoading(true);
    });

    render(
      <MemoryRouter initialEntries={["/shows/1"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument();
  });

  it("renders show details once loaded", async () => {
    (getShow as jest.Mock).mockImplementation((_id, setShow, setLoading) => {
      setShow(mockShow);
      setLoading(false);
    });

    render(
      <MemoryRouter initialEntries={["/shows/1"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.queryByTestId("skeleton-loader")).not.toBeInTheDocument(),
    );

    expect(screen.getByText("Test Show")).toBeInTheDocument();
    expect(screen.getByText("Test Overview")).toBeInTheDocument();
  });

  it("renders default test when no backdrop_path is available", async () => {
    const mockShowWithoutImage = { ...mockShow, backdrop_path: null };

    (getShow as jest.Mock).mockImplementation((_id, setShow, setLoading) => {
      setShow(mockShowWithoutImage);
      setLoading(false);
    });

    render(
      <MemoryRouter initialEntries={["/shows/1"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.queryByTestId("skeleton-loader")).not.toBeInTheDocument(),
    );

    expect(screen.getByAltText("show")).toHaveAttribute("alt", "show");
  });

  it("uses the correct id from useParams", () => {
    (getShow as jest.Mock).mockImplementation((id, setShow, setLoading) => {
      setShow(mockShow);
      setLoading(false);
    });

    render(
      <MemoryRouter initialEntries={["/shows/123"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(getShow).toHaveBeenCalledWith(
      "123",
      expect.any(Function),
      expect.any(Function),
    );
  });
});
