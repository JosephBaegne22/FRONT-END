import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Alert } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import MainMenuScreen from "./screens/MainMenuScreen";
import ManualGameEndMenuScreen from "./screens/ManualGameEndMenuScreen";
import GameScreen from "./screens/GameScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="MainMenu" component={MainMenuScreen} />
      <Stack.Screen name="Game" component={GameScreen} /> */}
      <Stack.Screen name="ManualGameEndMenu" component={ManualGameEndMenuScreen} />
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
      <Stack.Screen name="MainAuthMenu" component={MainMenuScreen} />
      <Stack.Screen name="AuthGame" component={GameScreen} />
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
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
