import { FocusEvent, MouseEvent } from "react";

export interface ToolTip {
  id: string;
  title: string;
  coords: {
    x: number | undefined;
    y: number | undefined;
  };
}

export interface UseToolTip {
  toolTip: ToolTip;
  addToolTip: (toolTip: Omit<ToolTip, "id">) => void;
  removeToolTip: () => void;
  showToolTip: boolean;
  setShowToolTip: (showToolTip: boolean) => void;
  getToolTipAttributes: (
    title: string,
    options?: Partial<{ hideToolTip: boolean }>
  ) => {
    onFocus: (e: FocusEvent) => void;
    onBlur: () => void;
    onMouseLeave: () => void;
    onMouseMove: (e: MouseEvent) => void;
  };
}
