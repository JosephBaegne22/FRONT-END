import { useState } from "react";
import { Alert, StyleSheet, View, Text, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import SwitchLink from "../ui/SwitchLink";
import IconButton from "../ui/IconButton";

function AuthContent({ isLogin, isResetPwd, onAuthenticate, title, style }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });

  function submitHandler(credentials) {
    let { username, secretAnswer, password, confirmPassword } = credentials;

    username = username.trim();
    password = password.trim();

    const usernameIsValid = username.length >= 4;
    const passwordIsValid = password.length > 7;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !usernameIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual)
    ) {
      Alert.alert(
        "Entrée invalide, veuillez vérifier les informations que vous avez saisies."
      );
      setCredentialsInvalid({
        username: !usernameIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ username, password, secretAnswer });
  }

  return (
    <View style={[styles.authContent, style]}>
      <SafeAreaView style={{ flex: 1 }}>
        {(isLogin || isResetPwd) && (
          <IconButton
            icon={"arrow-back"}
            color={Colors.primary300}
            size={32}
            onPress={() =>
              isResetPwd ? navigation.replace("Login") : navigation.goBack()
            }
            isResetPwd={isResetPwd}
          ></IconButton>
        )}
        <Text style={styles.title}>{title}</Text>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
          isResetPwd={isResetPwd}
        />
        {isLogin ? (
          <>
            <FlatButton
              onPress={() => navigation.replace("Signup", { resetPwd: true })}
            >
              Mot de passe oublié ?
            </FlatButton>
            <SwitchLink
              question={"Vous n'avez pas de compte ? "}
              link={"Inscrivez-vous"}
              onPress={() => navigation.replace("Signup")}
            ></SwitchLink>
          </>
        ) : (
          !isResetPwd && (
            <SwitchLink
              question={"Vous avez un compte ? "}
              link={"Connectez-vous"}
              onPress={() => navigation.replace("Login")}
            ></SwitchLink>
          )
        )}
      </SafeAreaView>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    flex: 1,
    paddingHorizontal: Platform.OS === "android" ? 64 : 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
