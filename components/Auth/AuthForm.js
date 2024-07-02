import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
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
              label="Adresse email"
              onUpdateValue={setEnteredEmail}
              value={enteredEmail}
              keyboardType="email-address"
              isInvalid={emailIsInvalid}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              label="Mot de passe"
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
              label="Confirmez l'adresse email"
              onUpdateValue={setEnteredConfirmEmail}
              value={enteredConfirmEmail}
              keyboardType="email-address"
              isInvalid={emailsDontMatch}
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
          {isLogin ? "Se connecter" : "S'inscrire"}
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
});
