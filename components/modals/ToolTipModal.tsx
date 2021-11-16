import { createPortal } from "react-dom";
import { ReactPortal, useEffect, useRef, useState } from "react";
import useToolTip from "hooks/useToolTip";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";

export default function ToolTipModal(): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element | null>();
  const { toolTip, showToolTip, mouseCoords } = useToolTip();
  const { darkMode } = useDarkMode();
  const [shouldShowToolTip, setShouldShowToolTip] = useState(false);
  const [coords, setCoords] = useState(mouseCoords);
  const [windowOffset, setWindowOffset] = useState(coords.x - 30);
  const toolTipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setTargetNode(document.querySelector("#toolTip"));
  }, []);

  useEffect(() => {
    if (shouldShowToolTip) {
      const toolTipWitdh = toolTipRef.current?.getClientRects()[0]?.width;
      if (toolTipWitdh && coords.x && innerWidth - coords?.x < toolTipWitdh) {
        setWindowOffset(innerWidth - toolTipWitdh - 30);
        return;
      }
    }
    setWindowOffset(coords.x - 30);
  }, [coords, shouldShowToolTip]);

  useEffect(() => {
    const timeOut: NodeJS.Timeout | null =
      showToolTip && !shouldShowToolTip
        ? setTimeout(() => {
            setCoords(mouseCoords);
            const toolTipWitdh = toolTipRef.current?.getClientRects()[0].width;
            if (
              toolTipWitdh &&
              coords.x &&
              innerWidth - coords?.x < toolTipWitdh
            ) {
              setWindowOffset(innerWidth - toolTipWitdh - 30);
              return;
            }
            setShouldShowToolTip(true);
          }, 1000)
        : null;

    if (!showToolTip) {
      setShouldShowToolTip(false);
    }

    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [coords, showToolTip, mouseCoords, shouldShowToolTip]);

  if (targetNode === null) {
    throw new Error("ToolTipModal needs a target element with id: toolTip");
  }

  if (targetNode === undefined || !toolTip) {
    return null;
  }

  if (toolTip.title === "") {
    return null;
  }

  return createPortal(
    <span
      id={`t-${toolTip.title}`}
      role="tooltip"
      style={{
        left: `${windowOffset}px`,
        top: `${coords?.y ? coords?.y - 40 : -40}px`,
      }}
      ref={toolTipRef}
    >
      {toolTip.title}
      <style jsx>
        {`
          span {
            display: ${shouldShowToolTip ? "block" : "none"};
            pointer-events: ${shouldShowToolTip ? "all" : "none"};
            background-color: ${darkMode
              ? colors.dark_accents3
              : colors.accents3};
            color: ${darkMode ? colors.dark_textColor : colors.textColor};
            box-shadow: 0px 0px 4px 0px
              ${darkMode
                ? "rgba(200, 200, 200, 0.30)"
                : "rgba(84, 84, 84, 0.15)"};
          }
        `}
      </style>
      <style jsx>{`
        span {
          position: fixed;
          border-radius: 4px;
          bottom: 30px;
          font-size: 14px;
          padding: 3px 8px;
          user-select: none;
          max-width: 50vw;
          width: max-content;
          height: max-content;
          z-index: 9090;
        }
      `}</style>
    </span>,
    targetNode
  );
}
