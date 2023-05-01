import "@testing-library/jest-dom/extend-expect";

jest.mock("nanoid", () => {
  return {
    nanoid: () => "mocked-nanoid-id",
  };
});
