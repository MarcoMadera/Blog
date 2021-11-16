import { FocusEvent, MouseEvent } from "react";

export interface ToolTip {
  title: string;
}

export interface UseToolTip {
  toolTip: ToolTip;
  addToolTip: (
    toolTip: ToolTip,
    coords:
      | {
          x: number;
          y: number;
        }
      | undefined
  ) => void;
  showToolTip: boolean;
  setShowToolTip: (showToolTip: boolean) => void;
  mouseCoords:
    | {
        x: number;
        y: number;
      }
    | undefined;
  getToolTipAttrbutes: (
    title: string,
    options?: Partial<{ hideToolTip: boolean }>
  ) => {
    onMouseEnter: () => void;
    onFocus: (e: FocusEvent) => void;
    onBlur: () => void;
    onMouseLeave: () => void;
    onMouseMove: (e: MouseEvent) => void;
  };
}
