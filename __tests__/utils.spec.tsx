import { act } from "react-test-renderer";
import {
  numberBetweenRange,
  formatNumber,
  getFormattedDate,
  camelize,
  convertInlineStylesToObject,
  convertParamsToObject,
  formatAMPM,
  getClientSize,
  insertTextBetween,
  getTwitterFormattedDate,
  getQuotedTwitterFormattedDate,
  a11ySmartFocus,
} from "../utils";

describe("numberBetweenRange", () => {
  it("pass 0 and 0", () => {
    expect.hasAssertions();
    const result = numberBetweenRange(0, 0);
    expect(result).toBe(0);
  });
});

describe("camelize", () => {
  it("should work", () => {
    expect.hasAssertions();
    expect(camelize("margin")).toBe("margin");
    expect(camelize("Margin")).toBe("Margin");
    expect(camelize("animation-fill-mode")).toBe("animationFillMode");
    expect(camelize("test-with-4-parts")).toBe("testWith4Parts");
    expect(camelize("232-343")).toBe("232343");
    expect(camelize("margin-left")).toBe("marginLeft");
  });
});

describe("convertInlineStylesToObject", () => {
  it("should match single property", () => {
    expect.hasAssertions();
    expect(convertInlineStylesToObject("margin: 0;")).toMatchObject({
      margin: "0",
    });
  });

  it("should match multiple properties", () => {
    expect.hasAssertions();
    expect(convertInlineStylesToObject("margin: 0; padding: 0;")).toMatchObject(
      {
        margin: "0",
        padding: "0",
      }
    );
  });

  it("should match compund properties", () => {
    expect.hasAssertions();
    expect(
      convertInlineStylesToObject(
        "margin-top: 10px; margin-right: 10px; margin-bottom: 10px; margin-left: 10px;"
      )
    ).toMatchObject({
      marginBottom: "10px",
      marginLeft: "10px",
      marginRight: "10px",
      marginTop: "10px",
    });
  });
});

describe("formatAMPM", () => {
  it("should work", () => {
    expect.hasAssertions();
    expect(formatAMPM(new Date(2019, 0, 1, 0, 0, 0))).toBe("12:00 AM");
    expect(formatAMPM(new Date(2019, 0, 1, 12, 0, 0))).toBe("12:00 PM");
    expect(formatAMPM(new Date(2019, 0, 1, 13, 0, 0))).toBe("1:00 PM");
    expect(formatAMPM(new Date(2019, 0, 1, 23, 0, 0))).toBe("11:00 PM");
  });
});

describe("getClientSize", () => {
  let windowSpy: jest.SpyInstance<(Window & typeof globalThis) | undefined, []>;
  // eslint-disable-next-line jest/no-hooks
  beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });

  // eslint-disable-next-line jest/no-hooks
  afterEach(() => {
    windowSpy.mockRestore();
  });

  it("should work 360x640 devices", () => {
    expect.hasAssertions();
    windowSpy.mockImplementation(() => ({
      ...windowSpy.mock.results[0].value,
      innerWidth: 360,
      innerHeight: 640,
    }));

    expect(getClientSize(4000, 3000)).toMatchObject({
      widthPercent: 100,
      heightPercent: 42.19,
    });

    expect(getClientSize(200, 200)).toMatchObject({
      widthPercent: 55.56,
      heightPercent: 31.25,
    });

    expect(getClientSize(2333, 500)).toMatchObject({
      widthPercent: 100,
      heightPercent: 12.06,
    });
  });

  it("should work 1024x640 devices", () => {
    expect.hasAssertions();
    windowSpy.mockImplementation(() => ({
      ...windowSpy.mock.results[0].value,
      innerWidth: 1024,
      innerHeight: 640,
    }));

    expect(getClientSize(4000, 3000)).toMatchObject({
      widthPercent: 83.33,
      heightPercent: 100,
    });

    expect(getClientSize(200, 200)).toMatchObject({
      widthPercent: 19.53,
      heightPercent: 31.25,
    });

    expect(getClientSize(2333, 500)).toMatchObject({
      widthPercent: 100,
      heightPercent: 34.29,
    });
  });

  it("should work 1920x1080 devices", () => {
    expect.hasAssertions();
    windowSpy.mockImplementation(() => ({
      ...windowSpy.mock.results[0].value,
      innerWidth: 1920,
      innerHeight: 1080,
    }));

    expect(getClientSize(4000, 3000)).toMatchObject({
      widthPercent: 75,
      heightPercent: 100,
    });

    expect(getClientSize(200, 200)).toMatchObject({
      widthPercent: 10.42,
      heightPercent: 18.52,
    });

    expect(getClientSize(2333, 500)).toMatchObject({
      widthPercent: 100,
      heightPercent: 38.1,
    });
  });

  it("should be undefined.", () => {
    expect.hasAssertions();
    windowSpy.mockImplementation(() => undefined);

    expect(window).toBeUndefined();
  });
});

describe("formatNumber", () => {
  it("expected behaviour", () => {
    expect.hasAssertions();
    expect(formatNumber(928392382)).toBe("928,392,382");
    expect(formatNumber(928_392_382)).toBe("928,392,382");
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

  it("pass date", () => {
    expect.hasAssertions();
    const result = getFormattedDate(new Date("2020-03-13"));
    expect(result).toBe("13 mar. 2020");
  });
});

describe("convertParamsToObject", () => {
  it("should work", () => {
    expect.hasAssertions();
    expect(convertParamsToObject("a=1&b=2")).toMatchObject({ a: "1", b: "2" });
  });
});

describe("insertTextBetween", () => {
  it("should work", () => {
    expect.hasAssertions();
    expect(insertTextBetween("Insert here", 7, "text ")).toBe(
      "Insert text here"
    );
  });
});

describe("getTwitterFormattedDate", () => {
  it("should work", () => {
    expect.hasAssertions();
    expect(getTwitterFormattedDate(new Date("2021-03-12"))).toBe(
      "6:00 PM - 11 mar, 2021"
    );
  });
});

describe("getQuotedTwitterFormattedDate", () => {
  it("should work", () => {
    expect.hasAssertions();
    expect(getQuotedTwitterFormattedDate(new Date("2021-03-12"))).toBe(
      "11 mar"
    );
  });
});

describe("a11ySmartFocus", () => {
  // eslint-disable-next-line jest/no-hooks
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should focus main", () => {
    expect.hasAssertions();
    const main = document.createElement("main");
    document.body.appendChild(main);

    expect(main.getAttribute("tabindex")).toBeNull();

    act(() => {
      a11ySmartFocus();
    });

    expect(main.getAttribute("tabindex")).toBe("-1");
    expect(document.activeElement).toBe(main);
  });

  it("should focus h1", () => {
    expect.hasAssertions();

    const main = document.createElement("main");
    document.body.appendChild(main);
    const h1 = document.createElement("h1");
    document.body.appendChild(h1);
    expect(h1.getAttribute("tabindex")).toBeNull();

    act(() => {
      a11ySmartFocus();
    });

    expect(h1.getAttribute("tabindex")).toBe("-1");
    expect(document.activeElement).toBe(h1);
    expect(document.activeElement).not.toBe(main);
  });

  it("should focus body", () => {
    expect.hasAssertions();

    expect(document.body.getAttribute("tabindex")).toBeNull();

    act(() => {
      a11ySmartFocus();
    });

    expect(document.body.getAttribute("tabindex")).toBe("-1");
    expect(document.activeElement).toBe(document.body);
  });
});
