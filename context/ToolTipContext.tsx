import ToolTipModal from "components/modals/ToolTipModal";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  ReactElement,
} from "react";
import { ToolTip } from "types/tooltip";

const ToolTipContext = createContext<ToolTipContextProviderProps | undefined>(
  undefined
);

interface ToolTipContextProviderProps {
  toolTip: ToolTip;
  setToolTip: Dispatch<SetStateAction<ToolTipContextProviderProps["toolTip"]>>;
  showToolTip: boolean;
  setShowToolTip: Dispatch<SetStateAction<boolean>>;
  mouseCoords: { x: number; y: number };
  setMouseCoords: Dispatch<
    SetStateAction<ToolTipContextProviderProps["mouseCoords"]>
  >;
}

export function ToolTipContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [toolTip, setToolTip] = useState<ToolTip>({
    title: "",
  });
  const [showToolTip, setShowToolTip] = useState<boolean>(false);
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  return (
    <ToolTipContext.Provider
      value={{
        toolTip,
        setToolTip,
        showToolTip,
        setShowToolTip,
        mouseCoords,
        setMouseCoords,
      }}
    >
      <ToolTipModal />
      {children}
    </ToolTipContext.Provider>
  );
}

export default ToolTipContext;
