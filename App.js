import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Alert } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MainMenuScreen from "./screens/MainMenuScreen";
import GameEndMenuScreen from "./screens/GameEndMenuScreen";
import StatsScreen from "./screens/StatsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import InGameMenuScreen from "./screens/InGameMenuScreen";
import GameScreen from "./screens/GameScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { initSocket } from "./util/websocket";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="MainMenu" component={MainMenuScreen} />
      <Stack.Screen name="Game" component={GameScreen} />
	  <Stack.Screen name="InGameMenu" component={InGameMenuScreen} />
      <Stack.Screen name="GameEndMenu" component={GameEndMenuScreen} />
      <Stack.Screen name="Stats" component={StatsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
	  {/* In fine, les paramètres ne seront accessibles que si l'on est connecté. Ce lien va donc disparaitre. */}
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthMainMenu" component={MainMenuScreen} />
      <Stack.Screen name="AuthGame" component={GameScreen} />
	  <Stack.Screen name="AuthInGameMenu" component={InGameMenuScreen} />
      <Stack.Screen name="AuthGameEndMenu" component={GameEndMenuScreen} />
      <Stack.Screen name="AuthStats" component={StatsScreen} />
      <Stack.Screen name="AuthSettings" component={SettingsScreen} />
		{/* In fine, les paramètres ne seront accessibles que si l'on est connecté. Ce lien va donc devenir simplement "Settings". */}
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        const storedToken = await AsyncStorage.getItem("token");

        if (storedToken) {
          authCtx.authenticate(storedToken);
        }

        setIsTryingLogin(false);
      } catch (error) {
        Alert.alert("Échec de connexion!", "Veuillez réessayer plus tard!");
      }
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <ActivityIndicator size="large" />;
  }

  return <Navigation />;
}

export default function App() {
  useEffect(() => {
    initSocket();
    return () => {
      const socket = getSocket();
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
