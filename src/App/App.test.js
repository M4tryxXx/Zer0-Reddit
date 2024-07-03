import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders app", () => {
  render(<App />);
  const header = screen.getByText(/Zer0-CiV/i);
  const navLink = screen.getByText(/Home/i);
  expect(header).toBeInTheDocument();
  expect(navLink).toBeInTheDocument();
});
