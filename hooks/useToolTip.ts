import { FocusEvent, MouseEvent, useCallback, useContext, useRef } from "react";
import ToolTipContext from "context/ToolTipContext";
import type { UseToolTip } from "types/tooltip";

export default function useToolTip(): UseToolTip {
  const context = useContext(ToolTipContext);
  const moveTimeout = useRef<NodeJS.Timeout>();
  const displayTimeout = useRef<NodeJS.Timeout>();

  if (context === undefined) {
    throw new Error("useToolTip must be used within a ToolTipProvider");
  }

  const { toolTip, setToolTip, showToolTip, setShowToolTip } = context;

  const addToolTip: UseToolTip["addToolTip"] = useCallback(
    (toolTip) => {
      setToolTip({ ...toolTip, id: "tooltip-id" });
      setShowToolTip(true);
    },
    [setToolTip, setShowToolTip]
  );

  const removeToolTip: UseToolTip["removeToolTip"] = useCallback(() => {
    clearTimeout(moveTimeout.current as NodeJS.Timeout);
    clearTimeout(displayTimeout.current as NodeJS.Timeout);
    setToolTip({ id: "", title: "", coords: { x: undefined, y: undefined } });
    setShowToolTip(false);
  }, [setToolTip, setShowToolTip]);

  const getToolTipAttrbutes = useCallback(
    (title: string, options?: Partial<{ hideToolTip: boolean }>) => {
      const attrs = {
        onFocus: (e: FocusEvent) => {
          if (options?.hideToolTip) {
            return;
          }
          addToolTip({
            title: title,
            coords: {
              x: e.target.getClientRects()[0].left,
              y: e.target.getClientRects()[0].top,
            },
          });
        },
        onBlur: () => {
          removeToolTip();
        },
        onMouseLeave: () => {
          removeToolTip();
        },
        onMouseMove: (e: MouseEvent) => {
          removeToolTip();

          if (options?.hideToolTip || showToolTip) {
            return;
          }
          moveTimeout.current = setTimeout(() => {
            displayTimeout.current = setTimeout(() => {
              addToolTip({
                title: title,
                coords: {
                  x: e.clientX,
                  y: e.clientY,
                },
              });
            }, 700);
          }, 50);
        },
        "aria-describedby": "tooltip-id",
      };

      return attrs;
    },
    [addToolTip, removeToolTip, showToolTip]
  );

  return {
    toolTip,
    addToolTip,
    showToolTip,
    setShowToolTip,
    getToolTipAttrbutes,
    removeToolTip,
  };
}
