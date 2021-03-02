/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
const UserContext = createContext({ user: undefined, setUser: () => {} });

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
