/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useNotification from "../../hooks/useNotification";
import { NotificationContextProvider } from "../../context/NotificationContext";

describe("hooks/useNotification", () => {
  it("throws error if called outside of NotificationsProvider", () => {
    const hook = renderHook(() => useNotification());
    expect(hook.result.error).toEqual(
      Error("useNotification must be used within a NotificationProvider")
    );
  });

  it("returns context value of NotificationProvider", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <NotificationContextProvider>{children}</NotificationContextProvider>
    );
    const hook = renderHook(() => useNotification(), { wrapper });
    const { current } = hook.result;

    expect(current.addNotification).toBeDefined();
    expect(current.notifications).toBeDefined();
    expect(current.removeNotification).toBeDefined();
  });

  it("adds notification to notifications array", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <NotificationContextProvider>{children}</NotificationContextProvider>
    );

    const hook = renderHook(() => useNotification(), { wrapper });
    const { current } = hook.result;

    act(() => {
      current.addNotification({
        message: "test",
        variant: "success",
      });
    });
    const lastResult = hook.result.current.notifications[0];
    expect(lastResult.message).toEqual("test");
  });

  it("removes notification from notifications array", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <NotificationContextProvider>{children}</NotificationContextProvider>
    );

    const hook = renderHook(() => useNotification(), { wrapper });
    const { current } = hook.result;

    act(() =>
      current.addNotification({
        message: "test",
        variant: "success",
      })
    );
    const notifications = hook.result.current.notifications;
    act(() => current.removeNotification(notifications[0].id));
    expect(hook.result.current.notifications.length).toEqual(0);
  });
});
