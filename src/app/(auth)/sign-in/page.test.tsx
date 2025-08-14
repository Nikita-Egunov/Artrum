// Page.test.tsx
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page Component", () => {
  it("should render without errors", () => {
    expect(() => {
      render(<Page />);
    }).not.toThrow();
  });

  it("should render the SignInPage component", () => {
    render(<Page />);
    const el = screen.getByTestId("sign-in-page");
    expect(el).toBeInTheDocument();
  });
});
