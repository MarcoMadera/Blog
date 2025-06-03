import "@testing-library/jest-dom";

jest.mock("nanoid", () => {
  return {
    nanoid: () => "mocked-nanoid-id",
  };
});
