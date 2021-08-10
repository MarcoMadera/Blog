import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  ReactElement,
} from "react";

interface CookiesContext {
  acceptedcookies: boolean | undefined;
  setAcceptedCookies: Dispatch<SetStateAction<boolean | undefined>>;
}

const Context = createContext<CookiesContext | undefined>(undefined);

export function CookiesContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [acceptedcookies, setAcceptedCookies] =
    useState<CookiesContext["acceptedcookies"]>();
  return (
    <Context.Provider value={{ acceptedcookies, setAcceptedCookies }}>
      {children}
    </Context.Provider>
  );
}

export default Context;
