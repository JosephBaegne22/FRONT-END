import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import Button from "../ui/Button";
import Input from "./Input";
import { updateUser } from "../../util/auth";  // Si le fichier auth.js est dans util


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

    async function submitHandler() {
		console.log("Bouton cliqué");
		if (enteredPassword !== enteredConfirmPassword) {
			Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
			return;
		 }
	  
		 try {
			console.log("Envoi des données...");
			const response = await updateUser(enteredUsername, enteredConfirmPassword, enteredSecretAnswer);
			console.log("Réponse de l'API :", response);  // Affiche la réponse de l'API
			Alert.alert("Succès", "Les informations ont été mises à jour avec succès !");
		 } catch (error) {
			console.log("Erreur lors de la requête :", error);
			Alert.alert("Erreur", error.message);
		 }
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
    },
});
