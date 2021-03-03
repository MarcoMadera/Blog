/* eslint-disable react/prop-types */
import { useState, createContext, useEffect } from "react";
const UserContext = createContext({
  user: undefined,
  setUser: () => {},
  isLoggedIn: false,
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
