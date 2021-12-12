import React, { ReactNode, ReactPortal } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useNotification from "hooks/useNotification";
import { NotificationContextProvider } from "context/NotificationContext";
import { DarkModeContextProvider } from "context/DarkModeContext";
import ReactDOM from "react-dom";

describe("hooks/useNotification", () => {
  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    jest
      .spyOn(ReactDOM, "createPortal")
      .mockImplementation((element: unknown) => {
        return element as ReactPortal;
      });

    const div = document.createElement("div");
    div.setAttribute("id", "notification");
    document.body.appendChild(div);
  });

  it("throws error if called outside of NotificationsProvider", () => {
    expect.hasAssertions();
    const { result } = renderHook(() => useNotification());
    expect(result.error).toStrictEqual(
      Error("useNotification must be used within a NotificationProvider")
    );
  });

  it("returns context value of NotificationProvider", () => {
    expect.hasAssertions();

    const wrapper = ({ children }: { children: ReactNode }) => (
      <DarkModeContextProvider>
        <NotificationContextProvider>{children}</NotificationContextProvider>
      </DarkModeContextProvider>
    );
    const { result } = renderHook(() => useNotification(), { wrapper });

    expect(result.current.addNotification).toBeDefined();
    expect(result.current.notifications).toBeDefined();
    expect(result.current.removeNotification).toBeDefined();
  });

  it("adds notification to notifications array", async () => {
    expect.assertions(2);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <DarkModeContextProvider>
        <NotificationContextProvider>{children}</NotificationContextProvider>
      </DarkModeContextProvider>
    );

    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current.addNotification({
        message: "test",
        variant: "success",
      });
    });
    expect(result.current.notifications).toHaveLength(1);
    const lastResult = result.current.notifications[0];
    expect(lastResult.message).toBe("test");
  });

  it("removes notification from notifications array", () => {
    expect.assertions(2);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <DarkModeContextProvider>
        <NotificationContextProvider>{children}</NotificationContextProvider>
      </DarkModeContextProvider>
    );

    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() =>
      result.current.addNotification({
        message: "test",
        variant: "success",
      })
    );
    const notifications = result.current.notifications;
    expect(result.current.notifications).toHaveLength(1);
    act(() => result.current.removeNotification(notifications[0].id));
    expect(result.current.notifications).toHaveLength(0);
  });
});
