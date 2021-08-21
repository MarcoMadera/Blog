import { useLayoutEffect } from "react";

export default function useLockBodyScroll(): void {
  // useLaoutEffect callback return type is "() => void" type
  useLayoutEffect((): (() => void) => {
    // Get original <html> styles
    const originalOverflowY: string = window.getComputedStyle(
      document.documentElement
    ).overflowY;
    const originalPosition: string = window.getComputedStyle(
      document.documentElement
    ).position;
    const originalScrollBehavior: string = window.getComputedStyle(
      document.documentElement
    ).scrollBehavior;
    const originalTop: number = document.documentElement.scrollTop;

    // Prevent scrolling on mount
    document.documentElement.style.position = "fixed";
    document.documentElement.style.overflowY = "scroll";
    document.documentElement.style.top = `-${originalTop}px`;
    document.documentElement.style.scrollBehavior = "initial";

    // Re-enable scrolling when component unmounts
    return () => {
      document.documentElement.style.overflowY = originalOverflowY;
      document.documentElement.style.position = originalPosition;
      scrollTo({ behavior: "auto", top: originalTop, left: 0 });
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, []); // Empty array ensures effect is only run on mount and unmount
}
