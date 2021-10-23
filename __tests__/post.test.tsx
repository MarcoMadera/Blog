import { getPostsFiles } from "../lib/posts";
import { numberBetweenRange, formatNumber, getFormattedDate } from "../utils";

it("should show the file names", async () => {
  const fileNames = getPostsFiles();
  const expected = { filename: "accesibilidad-web.md" };
  expect(fileNames).toEqual(
    expect.arrayContaining([expect.objectContaining(expected)])
  );
});

describe("numberBetweenRange", () => {
  test("pass 0 and 0", () => {
    const result = numberBetweenRange(0, 0);
    expect(result).toBe(0);
  });
});

describe("formatNumber", () => {
  test("expected behaviour", () => {
    const result = formatNumber(928392382);
    expect(result).toBe("928,392,382");
  });

  test("pass a single number", () => {
    const result = formatNumber(1);
    expect(result).toBe("1");
  });

  test("pass 0", () => {
    const result = formatNumber(0);
    expect(result).toBe("0");
  });
});

describe("getFormattedDate", () => {
  test("pass today date", () => {
    const result = getFormattedDate("march 13 2021");
    expect(result).toBe("13 mar. 2021");
  });

  test("pass a single number", () => {
    const result = getFormattedDate("1");
    expect(result).toBe("1 ene. 2001");
  });

  test("pass 0", () => {
    const result = getFormattedDate("0");
    expect(result).toBe("1 ene. 2000");
  });
});
