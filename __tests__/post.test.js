import { getPostsFiles } from "../lib/posts";
import {
  numberBetween,
  formatNumber,
  getFormattedDate,
} from "../utils/helpers";
it("should show the file names", async () => {
  const fileNames = getPostsFiles();
  const expected = { filename: "accesibilidad-web.md" };
  expect(fileNames).toEqual(
    expect.arrayContaining([expect.objectContaining(expected)])
  );
});

describe("numberBetween", () => {
  test("pass 0 and 0", () => {
    const result = numberBetween(0, 0);
    expect(result).toBe(0);
  });

  test("pass undefined", () => {
    const result = numberBetween(undefined);
    expect(result).toBeFalsy();
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

  test("pass undefined", () => {
    const result = formatNumber(undefined);
    expect(result).toBeUndefined();
  });
});

describe("getFormattedDate", () => {
  test("pass today date", () => {
    const result = getFormattedDate("march 13 2021");
    expect(result).toBe("13 mar. 2021");
  });

  test("pass a single number", () => {
    const result = getFormattedDate(1);
    expect(result).toBe("1");
  });

  test("pass 0", () => {
    const result = getFormattedDate(0);
    expect(result).toBe("0");
  });

  test("pass undefined", () => {
    const result = getFormattedDate(undefined);
    expect(result).toBeUndefined();
  });
});
