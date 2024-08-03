import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

function SettingsForm({ onSubmit, credentialsInvalid }) {
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
						label="Nouveau mot de passe"
						onUpdateValue={setEnteredPassword}
						secure
						value={enteredPassword}
						isInvalid={passwordIsInvalid}
					/>
					<Input
						label="Confirmez le mot de passe"
						onUpdateValue={setEnteredConfirmPassword}
						secure
						value={enteredConfirmPassword}
						isInvalid={passwordsDontMatch}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Input
						label="Confirmez votre marque de voiture préférée !"
						onUpdateValue={setEnteredSecretAnswer}
						value={enteredSecretAnswer}
					/>
				</View>
			</View>
			<View style={styles.buttons}>
				<Button onPress={submitHandler}>
					Mettre à jour
				</Button>
			</View>
		</View>
	);
}

export default SettingsForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
    marginHorizontal: 24,
  },
  inputLayout: {
    flexDirection: "column",
  },
  inputContainer: {
    flex: 1,
	flexDirection: "row",
  },
  form: {
    marginBottom: 22,
  }
});
