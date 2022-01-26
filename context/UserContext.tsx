import {
  useState,
  createContext,
  useEffect,
  ReactElement,
  ReactNode,
} from "react";
import { onAuthStateChanged } from "lib/firebase/client";
import type { UserContextTypes, User } from "types/user";

const UserContext = createContext<UserContextTypes | undefined>(undefined);

export function UserContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Detect user and log in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user?.uid);
    return () => {
      setIsLoggedIn(false);
    };
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
