import { createPortal } from "react-dom";
import {
  ReactPortal,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useToolTip from "hooks/useToolTip";
import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";

export default function ToolTipModal(): ReactPortal | null {
  const [targetNode, setTargetNode] = useState<Element | null>();
  const { showToolTip, toolTip } = useToolTip();
  const { darkMode } = useDarkMode();
  const [toolTipPos, setToolTipPos] = useState({
    x: (toolTip.coords.x ?? 0) - 30,
    y: (toolTip.coords.y ?? 0) - 40,
  });
  const [isDifferentPos, setIsDifferentPos] = useState<boolean>(false);
  const toolTipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setTargetNode(document.querySelector("#toolTip"));
  }, []);

  useLayoutEffect(() => {
    setIsDifferentPos(false);
    if (
      (!toolTip.coords.x && !toolTip.coords.y) ||
      !showToolTip ||
      !toolTipRef.current
    ) {
      return;
    }
    const toolTipRectWitdh = toolTipRef.current.getClientRects()[0]?.width || 0;
    const isToolTipWitdhOffScreen =
      toolTip.coords.x && innerWidth - toolTip.coords.x < toolTipRectWitdh;
    const isToolTipHeightOffScreen =
      toolTip.coords.y && toolTip.coords.y - 40 < 0;
    if (isToolTipWitdhOffScreen) {
      setToolTipPos((prevState) => ({
        ...prevState,
        x: innerWidth - toolTipRectWitdh - 30,
      }));
      setIsDifferentPos(true);
    }
    if (isToolTipHeightOffScreen) {
      setToolTipPos((prevState) => ({
        ...prevState,
        y: 10,
      }));
    }
    if (!isToolTipWitdhOffScreen && !isToolTipHeightOffScreen) {
      setIsDifferentPos(false);
    }
  }, [showToolTip, toolTip]);

  if (targetNode === null) {
    throw new Error("ToolTipModal needs a target element with id: toolTip");
  }

  if (targetNode === undefined) {
    return null;
  }

  const top =
    !toolTip.coords.y || toolTip.coords.y < 45 ? 50 : toolTip.coords.y - 40;
  const left = isDifferentPos
    ? toolTipPos.x
    : !toolTip.coords.x || toolTip.coords.x < 45
      ? 50
      : toolTip.coords.x - 30;

  const shouldShowToolTip = toolTip.title !== "" && showToolTip;

  return createPortal(
    <span
      id={toolTip.id}
      role="tooltip"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
      ref={toolTipRef}
      aria-hidden={!shouldShowToolTip}
    >
      {toolTip.title}
      <style jsx>
        {`
          span {
            display: ${shouldShowToolTip ? "block" : "none"};
            pointer-events: ${shouldShowToolTip ? "all" : "none"};
            background-color: ${darkMode ? colors.cinder : colors.romance};
            color: ${darkMode ? colors.greyGoose : colors.davyGrey};
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
