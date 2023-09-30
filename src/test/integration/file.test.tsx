import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import userEvent from "@testing-library/user-event";
import React from "react";

function renderComponent() {
  render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  );
}

beforeEach(() => {
  renderComponent();
});

test("banner text should show", () => {
  expect(
    screen.findByText(`Welcome to Trivia. Let's test your knowledge`)
  ).toBeTruthy();
});

test("show Trivi", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText(`Start the quiz!`));

  expect(
    screen.findByText(`Oops! You're not login yet. Please login first`)
  ).toBeTruthy();
});

test("login then open quiz", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText(`Login`));

  const inputField = screen.getByLabelText("Username");
  await user.type(inputField, "your-username");
  await user.click(screen.getByText(`Login`));

  expect(screen.findByText(`Welcome your-username`)).toBeTruthy();
});

test("start quiz, check answered and timer value", async () => {
  const user = userEvent.setup();
  await user.click(screen.getByText(`Start Quiz`));

  expect(screen.findByText(`Loading`)).toBeTruthy();
  expect(screen.findByText(`Answered: 0/30`)).toBeTruthy();
  expect(screen.findByText(`Timer: 15:00`)).toBeTruthy();
});
test("refresh, check modal is appear", async () => {
  window.location.reload();

  expect(screen.findByText(`Quiz Progress Discovered!`)).toBeTruthy();
  expect(screen.findByText(`No, go back to home`)).toBeTruthy();
  expect(screen.findByText(`Resume`)).toBeTruthy();
});
