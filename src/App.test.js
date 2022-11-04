import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import SearchInput from "./SearchInput";
import EmojiResults from "./EmojiResults";
import filterEmoji from "./filterEmoji";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

describe("My tests", () => {
  let header, items, searchInp;

  beforeEach(() => {
    render(<App />);
    header = screen.getByText("Emoji Search");
    items = screen.getAllByTestId("emoji");
    searchInp = screen.getByTestId("search-input");
  });

  test("Header renders", () => {
    expect(header).toBeInTheDocument();
  });

  test("List renders at start", () => {
    expect(items.length).toEqual(20);
  });

  test("Filtered list renders correctly", () => {
    fireEvent.change(searchInp, { target: { value: "100" } });
    items = screen.getAllByTestId("emoji");
    expect(items.length).toEqual(1);
    expect(searchInp).toHaveValue("100");
  });

  test("Copied to clipboard", () => {
    const copyClicks = screen.getAllByText("Click to copy emoji");
    userEvent.click(copyClicks[0]);
    userEvent.paste(searchInp, copyClicks);
    expect(searchInp.length === 1);
  });
});
