import ToolTipModal from "components/modals/ToolTipModal";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  ReactElement,
} from "react";
import type { ToolTip } from "types/tooltip";

const ToolTipContext = createContext<ToolTipContextProviderProps | undefined>(
  undefined
);

interface ToolTipContextProviderProps {
  toolTip: ToolTip;
  setToolTip: Dispatch<SetStateAction<ToolTipContextProviderProps["toolTip"]>>;
  showToolTip: boolean;
  setShowToolTip: Dispatch<SetStateAction<boolean>>;
}

export function ToolTipContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [toolTip, setToolTip] = useState<ToolTip>({
    id: "",
    title: "",
    coords: { x: undefined, y: undefined },
  });
  const [showToolTip, setShowToolTip] = useState<boolean>(false);

  return (
    <ToolTipContext.Provider
      value={{
        toolTip,
        setToolTip,
        showToolTip,
        setShowToolTip,
      }}
    >
      <ToolTipModal />
      {children}
    </ToolTipContext.Provider>
  );
}

export default ToolTipContext;
