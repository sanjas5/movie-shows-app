import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("BackButton", () => {
  it("should navigate back when clicked", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<BackButton />);
    fireEvent.click(screen.getByTitle("Back"));

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
