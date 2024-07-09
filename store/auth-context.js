import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

import User from "../types/user";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  user: User,
  authenticate: (token) => {},
  logout: () => {},
  getUser: (user) => {}
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [user, setUser] = useState(User);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    setUser(User);
  }

  function getUser(user) {
    setUser(user);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    user: user,
    authenticate: authenticate,
    logout: logout,
    getUser: getUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
