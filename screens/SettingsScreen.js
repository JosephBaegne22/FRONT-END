import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView } from "react-native";

import SettingsForm from "../components/auth/SettingsForm";
import { AuthContext } from "../store/auth-context";
import IconButton from "../components/ui/IconButton";
import { Colors, Sizes, FullMenuStyles } from "../constants/styles";

function SettingsScreen({ navigation }) {
  	const authCtx = useContext(AuthContext);
		const [credentialsInvalid, setCredentialsInvalid] = useState({
			username: false,
			password: false,
			confirmPassword: false,
		});
	
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);

	async function signupHandler({ username, password, secretAnswer }) {
		setIsAuthenticating(true);
		try {
		let res = await resetPassword(username, password, secretAnswer);
		const successMessage = SUCCESS_MESSAGES[res.message] || res.message;
		setMessage(successMessage);
		} catch (error) {
			let errorMessage;

			if (error?.data?.message) {
				errorMessage = ERROR_MESSAGES[error.data.message] || "Une erreur est survenue, veuillez vérifier vos données ou réessayez plus tard !";
			} else {
				errorMessage =
				"Une erreur est survenue, veuillez vérifier vos données ou réessayez plus tard !";
			}
				setError(errorMessage);
		} finally {
			setIsAuthenticating(false);
		}
	}

	useEffect(() => {
		if (message) {
			Alert.alert(message);
			setMessage("");
		}
		if (error) {
			Alert.alert(error);
			setError(null);
		}
	}, [message, error]);

	if (isAuthenticating) {
		return (
			<LoadingOverlay
				message={"Mise à jour en cours..."}
			/>
		);
	}
	function submitHandler() {
		onSubmit({
			username: enteredUsername,
			secretAnswer: enteredSecretAnswer,
			password: enteredPassword,
			confirmPassword: enteredConfirmPassword,
		});
	}

	return (
		<View style={FullMenuStyles.rootContainer}>
			<ImageBackground source={require("../assets/image_fond_menu.jpg")} resizeMode="cover" style={FullMenuStyles.backgroundImage}>
				<SafeAreaView style={FullMenuStyles.generalContainer}>
					<ScrollView>
						<View style={FullMenuStyles.menuContainer}>
							<View style={styles.iconContainer}>
								<IconButton
									icon={"arrow-back"}
									color={Colors.primary300}
									size={32}
									onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthMainMenu") : navigation.replace("MainMenu")}
									library={"Ionicons"}
								/>
							</View>
							<Text style={[FullMenuStyles.title]}>Paramètres</Text>
							<SettingsForm
								onAuthenticate={signupHandler}
								onSubmit={submitHandler}
								credentialsInvalid={credentialsInvalid}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
}

export default SettingsScreen;

const styles = StyleSheet.create({
	iconContainer:{
		flexDirection: "row",
		justifyContent: "flex-start",
		width: Sizes.full,
	},
	
});
