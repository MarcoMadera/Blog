import { Dispatch, SetStateAction } from "react";

export interface User {
  uid?: string | null;
  username: string | null;
  avatar: string | null;
  email: string | null;
}

export interface UserContextTypes {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isLoggedIn: boolean;
}
