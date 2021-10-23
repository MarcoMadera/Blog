import { renderHook, act } from "@testing-library/react-hooks";
import useDarkMode from "../../hooks/useDarkMode";
import { DarkModeContextProvider } from "../../context/DarkModeContext";
import { ReactNode } from "react";

it("throws error if called outside of NotificationsProvider", () => {
  const hook = renderHook(() => useDarkMode());
  expect(hook.result.error).toEqual(
    Error("useDarkMode must be used within a DarkModeProvider")
  );
});

test("toggleDarkMode function", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <DarkModeContextProvider>{children}</DarkModeContextProvider>
  );
  const hook = renderHook(() => useDarkMode(), { wrapper });
  act(() => {
    hook.result.current.toggleDarkMode();
  });
  expect(hook.result.current.darkMode).toBe(false);
  act(() => {
    hook.result.current.toggleDarkMode();
  });
  expect(hook.result.current.darkMode).toBe(true);
});
