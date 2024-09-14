import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

function SettingsForm({ onSubmit, credentialsInvalid, onAuthenticate }) {
	const [enteredUsername, setEnteredUsername] = useState("");
	const [enteredSecretAnswer, setEnteredSecretAnswer] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");
	const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

	const {
		username: usernameIsInvalid,
		password: passwordIsInvalid,
		confirmPassword: passwordsDontMatch,
	} = credentialsInvalid;

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
		<View style={styles.form}>
			<View style={styles.inputLayout}>
				<View style={styles.inputContainer}>
					<Input
						label="Nouveau nom d'utilisateur"
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
						label="Confirmez le nouveau mot de passe"
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
    marginTop: 8,
    marginHorizontal: 24,
  },
  inputLayout: {
    flexDirection: "column",
  },
  inputContainer: {
	flexDirection: "row",
  },
  form: {
    marginBottom: 22,
  }
});
