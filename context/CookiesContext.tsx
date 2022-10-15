import CookiesModal from "components/modals/CookiesModal";
import useLocalStorage from "hooks/useLocalStorage";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  ReactElement,
  useEffect,
} from "react";

interface CookiesContext {
  acceptedCookies: boolean | undefined;
  setAcceptedCookies: Dispatch<SetStateAction<boolean | undefined>>;
}

const Context = createContext<CookiesContext | undefined>(undefined);

export function CookiesContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [acceptedCookies, setAcceptedCookies] =
    useState<CookiesContext["acceptedCookies"]>();
  const setAceptedCookiesLocalStorage = useLocalStorage(
    "cookiesAccepted",
    "false"
  )[1];

  useEffect(() => {
    if (acceptedCookies === false) {
      setAceptedCookiesLocalStorage("false");
    }
    if (acceptedCookies === true) {
      setAceptedCookiesLocalStorage("true");
    }
  });
  return (
    <Context.Provider value={{ acceptedCookies, setAcceptedCookies }}>
      {acceptedCookies === undefined ? <CookiesModal /> : null}
      {children}
    </Context.Provider>
  );
}

export default Context;
