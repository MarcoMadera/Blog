import { getPostsFiles } from "../lib/posts";
import { numberBetweenRange, formatNumber, getFormattedDate } from "../utils";

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

describe("numberBetweenRange", () => {
  it("pass 0 and 0", () => {
    expect.hasAssertions();
    const result = numberBetweenRange(0, 0);
    expect(result).toBe(0);
  });
});

describe("formatNumber", () => {
  it("expected behaviour", () => {
    expect.hasAssertions();
    const result = formatNumber(928392382);
    expect(result).toBe("928,392,382");
  });

  it("pass a single number", () => {
    expect.hasAssertions();
    const result = formatNumber(1);
    expect(result).toBe("1");
  });

  it("pass 0", () => {
    expect.hasAssertions();
    const result = formatNumber(0);
    expect(result).toBe("0");
  });
});

describe("getFormattedDate", () => {
  it("pass today date", () => {
    expect.hasAssertions();
    const result = getFormattedDate("march 13 2021");
    expect(result).toBe("13 mar. 2021");
  });

  it("pass a single number", () => {
    expect.hasAssertions();
    const result = getFormattedDate("1");
    expect(result).toBe("1 ene. 2001");
  });

  it("pass 0", () => {
    expect.hasAssertions();
    const result = getFormattedDate("0");
    expect(result).toBe("1 ene. 2000");
  });
});
