import {
  useState,
  createContext,
  ReactElement,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface DarkModeContext {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const DarkModeContext = createContext<DarkModeContext | undefined>(undefined);

export function DarkModeContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContext;
