import React, { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useNotification from "../../hooks/useNotification";
import { NotificationContextProvider } from "../../context/NotificationContext";

describe("hooks/useNotification", () => {
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
      <NotificationContextProvider>{children}</NotificationContextProvider>
    );
    const { result } = renderHook(() => useNotification(), { wrapper });

    expect(result.current.addNotification).toBeDefined();
    expect(result.current.notifications).toBeDefined();
    expect(result.current.removeNotification).toBeDefined();
  });

  it("adds notification to notifications array", async () => {
    expect.hasAssertions();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <NotificationContextProvider>{children}</NotificationContextProvider>
    );

    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() => {
      result.current.addNotification({
        message: "test",
        variant: "success",
      });
    });
    const lastResult = result.current.notifications[0];
    expect(lastResult.message).toBe("test");
  });

  it("removes notification from notifications array", () => {
    expect.assertions(1);
    const wrapper = ({ children }: { children: ReactNode }) => (
      <NotificationContextProvider>{children}</NotificationContextProvider>
    );

    const { result } = renderHook(() => useNotification(), { wrapper });

    act(() =>
      result.current.addNotification({
        message: "test",
        variant: "success",
      })
    );
    const notifications = result.current.notifications;
    act(() => result.current.removeNotification(notifications[0].id));
    expect(result.current.notifications).toHaveLength(0);
  });
});
