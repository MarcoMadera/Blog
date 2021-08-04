import {
  useState,
  createContext,
  ReactElement,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

const DarkModeContext = createContext<DarkModeContext>({
  darkMode: true,
});

interface DarkModeContext {
  darkMode: boolean;
  setDarkMode?: Dispatch<SetStateAction<boolean>>;
}

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
