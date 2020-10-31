import React from "react";
import { render } from "@testing-library/react";
import About, { getServerSideProps } from "../pages/sobre-mi";
import Home from "../pages/index";

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

it("renders email button About page", () => {
  // Prevent flush for muted attribute in video element
  Object.defineProperty(HTMLMediaElement.prototype, "muted", {
    set: () => {},
  });

  const { getByTitle } = render(
    <About nowPlaying={{}} topTracks={[]} recentlyPlayed={{}} />
  );
  const emailButtom = getByTitle("Enviar correo electrónico");
  expect(emailButtom).toBeInTheDocument();
});

it("should render newsletter at home page", () => {
  const { getByLabelText } = render(<Home />);
  const linkElement = getByLabelText("¡Suscríbete al Newsletter!");
  expect(linkElement).toBeInTheDocument();
});
