import { renderHook, act } from "@testing-library/react-hooks";
import useDarkMode from "../../hooks/useDarkMode";
import { DarkModeContextProvider } from "../../context/DarkModeContext";
import { ReactNode } from "react";

describe("useDarkMode", () => {
  it("throws error if called outside of NotificationsProvider", () => {
    expect.hasAssertions();
    const { result } = renderHook(() => useDarkMode());
    expect(result.error).toStrictEqual(
      Error("useDarkMode must be used within a DarkModeProvider")
    );
  });

  it("toggleDarkMode function", () => {
    expect.hasAssertions();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <DarkModeContextProvider>{children}</DarkModeContextProvider>
    );
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    act(() => {
      result.current.toggleDarkMode();
    });
    expect(result.current.darkMode).toBe(false);
    act(() => {
      result.current.toggleDarkMode();
    });
    expect(result.current.darkMode).toBe(true);
  });
});
