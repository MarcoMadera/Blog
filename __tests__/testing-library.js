import React from "react";
import { render } from "@testing-library/react";
import About from "../pages/about";
import { getServerSideProps } from "../pages/about";

describe("getServerSideProps", () => {
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          nowPlaying: undefined,
          recentlyPlayed: undefined,
          topTracks: undefined,
        }),
    })
  );

  it("should call the api", async () => {
    const response = await getServerSideProps();
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          nowPlaying: undefined,
          recentlyPlayed: undefined,
          topTracks: undefined,
        },
      })
    );
  });
});

test("renders email button", () => {
  const { getByTitle } = render(<About />);
  const emailButtom = getByTitle("Enviar correo electrónico");
  expect(emailButtom).toBeInTheDocument();
});
test("renders deploy link", () => {
  const { getByText } = render(<About />);
  const linkElement = getByText("Ver series");
  expect(linkElement).toBeInTheDocument();
});
