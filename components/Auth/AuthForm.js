import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ isLogin, isResetPwd, onSubmit, credentialsInvalid }) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredSecretAnswer, setEnteredSecretAnswer] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    username: usernameIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function submitHandler() {
    onSubmit({
      username: enteredUsername,
      secretAnswer: enteredSecretAnswer,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View style={styles.inputLayout}>
        <View
          style={[
            styles.inputContainer,
            { flexDirection: isLogin ? "row" : "column" },
          ]}
        >
          <View style={styles.inputContainer}>
            <Input
              label="Nom d'utilisateur"
              onUpdateValue={setEnteredUsername}
              value={enteredUsername}
              isInvalid={usernameIsInvalid}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              label= {isResetPwd ? "Nouveau mot de passe" : "Mot de passe"} 
              onUpdateValue={setEnteredPassword}
              secure
              value={enteredPassword}
              isInvalid={passwordIsInvalid}
            />
          </View>
        </View>
        {!isLogin && (
          <View style={styles.inputContainer}>
            <Input
              label= {isResetPwd ? "Confirmez votre marque de voiture préférée !" : "Quelle est votre marque de voiture préférée ?"}
              onUpdateValue={setEnteredSecretAnswer}
              value={enteredSecretAnswer}
            />
            <Input
              label="Confirmez le mot de passe"
              onUpdateValue={setEnteredConfirmPassword}
              secure
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
            />
          </View>
        )}
      </View>
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          {isLogin ? "Se connecter" : (isResetPwd ? "Mettre à jour" : "S'inscrire")}
        </Button>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
    marginHorizontal: 24,
  },
  inputLayout: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
  },
  form: {
    marginBottom: 22
  }
});
