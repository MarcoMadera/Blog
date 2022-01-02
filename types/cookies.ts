import { Dispatch, SetStateAction } from "react";

export interface UseCookies {
  acceptedcookies: boolean | undefined;
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
  deleteCookie: (cookieName: string) => string;
  toggleAcceptedCookies: () => string;
}
