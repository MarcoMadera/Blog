import useDarkMode from "hooks/useDarkMode";
import { ReactElement, useEffect, useState } from "react";
import { a11ySmartFocus } from "utils";

export default function ScrollToTop(): ReactElement {
  const [percent, setPercent] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [hideButton, setHideButton] = useState(true);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setIsScrollingDown(scrollY > lastScrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [isScrollingDown]);

  useEffect(() => {
    const handleScroll = () => {
      setPercent(
        Math.round(
          (scrollY /
            (document.documentElement.scrollHeight -
              document.documentElement.clientHeight)) *
            10000
        ) / 100
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setHideButton(percent < 5 || isScrollingDown);
  }, [isScrollingDown, percent]);

  return (
    <div className="scrollToTop">
      <button
        className="scrollToTop__button"
        onClick={() => {
          window.scrollTo(0, 0);
          const firstElement = document.querySelector("body > *");
          a11ySmartFocus(firstElement as HTMLElement);
        }}
        aria-label="Volver al inicio"
        onFocus={() => {
          setHideButton(false);
        }}
        onBlur={() => {
          setHideButton(true);
        }}
      >
        <div
          className="radial-progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          role="progressbar"
          aria-label="Scroll progress"
          aria-live="polite"
        ></div>
        <div className="round">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            clip-rule="evenodd"
            fill="#000"
          >
            <path d="M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414Z" />
          </svg>
        </div>
      </button>
      <style jsx>{`
        .scrollToTop__button {
          background-color: ${percent > 95
            ? darkMode
              ? "#3f4a59"
              : "#e3e3e3"
            : darkMode
            ? "#1f2937"
            : "#fff"};
          transform: translateY(${hideButton ? "100px" : "0"});
        }
        .scrollToTop__button:hover,
        .scrollToTop__button:focus {
          background-color: ${darkMode ? "#3f4a59" : "#dddddd"};
          filter: ${percent < 95
            ? "brightness(1.1)"
            : darkMode
            ? "brightness(1.2)"
            : "none"};
        }
        .radial-progress:before {
          --line-color: ${percent < 95 ? "#ef2c2c" : "transparent"};
          background: radial-gradient(
                farthest-side,
                var(--line-color) 98%,
                #0000
              )
              top/0.25rem 0.25rem no-repeat,
            conic-gradient(var(--line-color) calc(${percent} * 1%), #0000 0);
          mask: radial-gradient(
            farthest-side,
            #0000 calc(99% - 0.25rem),
            var(--line-color) calc(100% - 0.25rem)
          );
        }
        .radial-progress:after {
          background-color: ${percent < 95 ? "#ef2c2c" : "transparent"};
          transform: rotate(calc(${percent} * 3.6deg - 90deg))
            translate(calc(4rem / 2 - 50%));
        }
        .round {
          border: 4px solid
            ${percent > 95
              ? darkMode
                ? "#3f4a59"
                : "#e3e3e3"
              : darkMode
              ? "#d8dee91a"
              : "#ccc"};
        }
        .scrollToTop__button svg {
          fill: ${darkMode ? "#fff" : "#000"};
        }
      `}</style>
      <style jsx>{`
        .scrollToTop {
          position: fixed;
          bottom: 0;
          right: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 1rem 1rem 0;
        }
        .scrollToTop__button {
          border-radius: 9999px;
          align-items: center;
          border: none;
          bottom: 1.5rem;
          color: currentColor;
          display: grid;
          height: 4rem;
          justify-content: center;
          min-height: 4rem;
          opacity: 1;
          padding: 0;
          position: fixed;
          right: 1.5rem;
          text-decoration-line: none;
          transition-duration: 0.5s;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          width: 4rem;
          z-index: 50;
          cursor: pointer;
        }
        .radial-progress {
          background-color: transparent;
          border-radius: 9999px;
          box-sizing: content-box;
          display: inline-grid;
          height: 4rem;
          place-content: center;
          justify-content: center;
          align-items: center;
          position: relative;
          vertical-align: middle;
          width: 4rem;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 0.5s;
          transition-property: all;
          grid-row-start: 1;
          grid-column-start: 1;
        }
        .radial-progress:before {
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          border-radius: 9999px;
          content: "";
          position: absolute;
        }
        .round {
          align-items: center;
          border-radius: 9999px;
          display: grid;
          grid-column-start: 1;
          grid-row-start: 1;
          height: 100%;
          justify-content: center;
          padding: 1rem;
          transition-duration: 0.5s;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }
        .radial-progress:after {
          inset: calc(50% - 0.25rem / 2);
          border-radius: 9999px;
          content: "";
          box-sizing: border-box;
          position: absolute;
        }
        .scrollToTop__button svg {
          transition: all 0.2s ease-in-out;
          width: 1.5rem;
          height: 1.5rem;
        }
        @media (min-width: 768px) {
          .scrollToTop {
            margin: 0 2rem 2rem 0;
          }
        }
        @media (min-width: 1024px) {
          .scrollToTop {
            margin: 0 3rem 3rem 0;
          }
        }
      `}</style>
    </div>
  );
}
