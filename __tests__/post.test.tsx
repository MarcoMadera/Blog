import {
  getPostsFiles,
  getPostBySlug,
  getPostsPages,
  getHomeDataFromPage,
} from "lib/posts";
import { siteMetadata } from "site.config";

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

describe("getPostBySlug", () => {
  it("should find the post", async () => {
    expect.hasAssertions();
    await expect(getPostBySlug("accesibilidad-web")).resolves.toBeDefined();
  });
});

describe("getPostsPages", () => {
  it("should return array of number", () => {
    expect.hasAssertions();

    const pages = getPostsPages();
    expect(pages).toStrictEqual(expect.arrayContaining([expect.any(Number)]));
  });
});

describe("getHomeDataFromPage", () => {
  it("posts should be not greater that postPerPage", async () => {
    expect.hasAssertions();
    const homedata = await getHomeDataFromPage(1);
    expect(homedata.allTags).toStrictEqual(
      expect.arrayContaining([expect.any(String)])
    );

    expect(homedata.pages).toStrictEqual(
      expect.arrayContaining([expect.any(Number)])
    );

    expect(homedata.posts.length).toBeLessThanOrEqual(
      siteMetadata.postsPerPage
    );
  });
});
