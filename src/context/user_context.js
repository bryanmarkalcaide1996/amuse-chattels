import React, { useContext, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
