import { renderHook, act } from "@testing-library/react";
import useDarkMode from "hooks/useDarkMode";
import { DarkModeContextProvider } from "context/DarkModeContext";
import { ReactNode } from "react";

describe("useDarkMode", () => {
  it("throws error if called outside of NotificationsProvider", () => {
    expect.hasAssertions();
    console.error = jest.fn();
    try {
      renderHook(() => useDarkMode());
    } catch (error: unknown) {
      expect((error as Error).message).toBe(
        "useDarkMode must be used within a DarkModeProvider"
      );
    }
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
