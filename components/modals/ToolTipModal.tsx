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
  const [renderModal, setRenderModal] = useState(false);
  const [coords, setCoords] = useState(mouseCoords);
  const [toolTipLeft, setToolTipLeft] = useState<number | undefined>(
    coords?.x ? coords.x - 30 : undefined
  );
  const [toolTipTop, setToolTipTop] = useState<number | undefined>(
    coords?.y ? coords.y - 40 : undefined
  );
  const toolTipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setTargetNode(document.querySelector("#toolTip"));
  }, []);

  useEffect(() => {
    if (shouldShowToolTip) {
      if (renderModal) {
        setCoords(mouseCoords);
        const toolTipWitdh = toolTipRef.current?.getClientRects()[0]?.width;
        const toolTipHeight = toolTipRef.current?.getClientRects()[0]?.height;
        const isToolTipWitdhShowOffScreen =
          toolTipWitdh && coords?.x && innerWidth - coords?.x < toolTipWitdh;
        const isToolTipHeightShowOffScreen =
          toolTipHeight && coords?.y && innerHeight - coords?.y < toolTipHeight;
        if (isToolTipWitdhShowOffScreen) {
          setToolTipLeft(innerWidth - toolTipWitdh - 30);
        }
        if (isToolTipHeightShowOffScreen) {
          setToolTipTop(innerHeight - toolTipHeight - 40);
        }
      } else {
        setRenderModal(true);
      }
    } else {
      setRenderModal(false);
    }
  }, [coords, shouldShowToolTip, renderModal, mouseCoords]);

  useEffect(() => {
    const timeOut: NodeJS.Timeout | null =
      showToolTip && !shouldShowToolTip
        ? setTimeout(() => {
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
  }, [showToolTip, shouldShowToolTip]);

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
    <>
      {renderModal && coords ? (
        <span
          id={`t-${toolTip.title}`}
          role="tooltip"
          style={{
            left: `${toolTipLeft ?? (coords?.x ? coords?.x - 30 : -30)}px`,
            top: `${toolTipTop ?? (coords?.y ? coords?.y - 40 : -40)}px`,
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
        </span>
      ) : null}
    </>,
    targetNode
  );
}
