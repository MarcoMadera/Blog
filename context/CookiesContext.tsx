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
  const setAceptedCookiesLocalStorage = useLocalStorage(
    "cookiesAccepted",
    "false"
  )[1];

  useEffect(() => {
    if (acceptedcookies === false) {
      setAceptedCookiesLocalStorage("false");
    }
    if (acceptedcookies === true) {
      setAceptedCookiesLocalStorage("true");
    }
  });
  return (
    <Context.Provider value={{ acceptedcookies, setAcceptedCookies }}>
      {acceptedcookies === undefined ? <CookiesModal /> : null}
      {children}
    </Context.Provider>
  );
}

export default Context;
