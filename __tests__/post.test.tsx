import { getPostsFiles, getPostsPages } from "lib/posts";

jest.mock("lib/firebase/admin", () => ({
  database: jest.fn(),
}));

describe("getPostsFiles", () => {
  it("should show the file names", async () => {
    expect.hasAssertions();
    const fileNames = getPostsFiles();

    const expected = { filename: "accesibilidad-web.md" };
    expect(fileNames).toStrictEqual(
      expect.arrayContaining([expect.objectContaining(expected)])
    );
  });
});

describe("getPostsPages", () => {
  it("should return array of number", () => {
    expect.hasAssertions();

    const pages = getPostsPages();
    expect(pages).toStrictEqual(expect.arrayContaining([expect.any(Number)]));
  });
});
