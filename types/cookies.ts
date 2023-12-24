import { Dispatch, SetStateAction } from "react";

export interface UseCookies {
  acceptedCookies: boolean | undefined;
  setAcceptedCookies: Dispatch<SetStateAction<boolean | undefined>>;
  getCookie: (cookieName: string) => string | false;
  setCookie: ({
    name,
    value,
    age,
  }: {
    name: string;
    value: string;
    age: number;
  }) => void;
  deleteCookie: (cookieName: string) => void;
  toggleAcceptedCookies: () => string;
}
