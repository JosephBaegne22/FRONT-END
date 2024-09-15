import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

import User from "../types/user";
import Race from "../types/race";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  user: User,
  race: Race,
  authenticate: (token) => {},
  logout: () => {},
  setUser: (user) => {},
  setRace: (race) => {}
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [user, setUser] = useState(User);
  const [race, setRace] = useState(Race);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    setUser(User);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    user: user,
    race: race,
    authenticate: authenticate,
    logout: logout,
    setUser: setUser,
    setRace: setRace
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
