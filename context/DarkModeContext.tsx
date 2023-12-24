import {
  useState,
  createContext,
  ReactElement,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
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

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    document.body.dataset.theme = theme;
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeContext;
