import { FocusEvent, MouseEvent, useCallback, useContext } from "react";
import ToolTipContext from "context/ToolTipContext";
import { UseToolTip } from "types/tooltip";

export default function useToolTip(): UseToolTip {
  const context = useContext(ToolTipContext);

  if (context === undefined) {
    throw new Error("useToolTip must be used within a ToolTipProvider");
  }

  const {
    toolTip,
    setToolTip,
    showToolTip,
    setShowToolTip,
    mouseCoords,
    setMouseCoords,
  } = context;

  const addToolTip: UseToolTip["addToolTip"] = useCallback(
    (toolTip, coords) => {
      setMouseCoords(coords);
      setToolTip(toolTip);
    },
    [setToolTip, setMouseCoords]
  );

  const getToolTipAttrbutes = useCallback(
    (title: string, options?: Partial<{ hideToolTip: boolean }>) => {
      const attrs = {
        onMouseEnter: () => setShowToolTip(true),
        onFocus: (e: FocusEvent) => {
          if (options?.hideToolTip) {
            return;
          }
          addToolTip(
            { title: title },
            {
              x: e.target.getClientRects()[0].left,
              y: e.target.getClientRects()[0].top,
            }
          );
          setShowToolTip(true);
        },
        onBlur: () => {
          addToolTip({ title: "" }, undefined);
          setShowToolTip(false);
        },
        onMouseLeave: () => {
          addToolTip({ title: "" }, undefined);
          setShowToolTip(false);
        },
        onMouseMove: (e: MouseEvent) => {
          if (options?.hideToolTip) {
            return;
          }
          addToolTip({ title: title }, { x: e.clientX, y: e.clientY });
        },
      };

      return attrs;
    },
    [addToolTip, setShowToolTip]
  );

  return {
    toolTip,
    addToolTip,
    showToolTip,
    setShowToolTip,
    mouseCoords,
    getToolTipAttrbutes,
  };
}
