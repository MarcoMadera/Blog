import { getPostsFiles } from "../utils/posts";

it("should show the file names", async () => {
  const fileNames = getPostsFiles();
  const expected = { filename: "accesibilidad-web.md" };
  expect(fileNames).toEqual(
    expect.arrayContaining([expect.objectContaining(expected)])
  );
});
