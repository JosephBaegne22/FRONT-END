import { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, Alert, SafeAreaView } from "react-native";

import { Sizes, FullMenuStyles } from "../constants/styles";

import { AuthContext } from "../store/auth-context";
import { signOut } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import Button from "../components/ui/Button";
import FlatButton from "../components/ui/FlatButton";
import { getSocket } from "../util/websocket";

function MainMenuScreen({ navigation }) {
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState(null);

	const authCtx = useContext(AuthContext);
	const socket = getSocket();

	const sendCommand = (command) => {
		if (socket && socket.readyState === WebSocket.OPEN) {
		  socket.send(JSON.stringify(command));
		} else {
		  Alert.alert(
			"Erreur de connexion",
			"La connexion avec le serveur n'est pas établie. Veuillez réessayer plus tard."
		  );
		}
	  };

	async function signOutHandler() {
		setIsSigningOut(true);
		try {
			const res = await signOut(authCtx);
			const successMessage = SUCCESS_MESSAGES[res.message] || res.message;
			setMessage(successMessage);
		} catch (error) {
			let errorMessage;

			if (error?.data?.message) {
				errorMessage = ERROR_MESSAGES[error.data.message] || "Une erreur est survenue lors de la déconnexion. Veuillez réessayer plus tard!";
			} else {
				errorMessage =
				"Une erreur est survenue lors de la déconnexion. Veuillez réessayer plus tard!";
			}
			setError(errorMessage);
		} finally {
			setIsSigningOut(false);
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

	if(isSigningOut){
		return <LoadingOverlay message={"Déconnexion en cours..."}></LoadingOverlay>
	}

	var userName = "";
	if (authCtx.user)
	{
		userName = (authCtx.user.username ?? " " + authCtx.user.username);
	}
	return (
		<View style={FullMenuStyles.rootContainer}>
			<ImageBackground source={require("../assets/image_fond_menu.jpg")} resizeMode="cover" style={FullMenuStyles.backgroundImage}>
				<SafeAreaView style={FullMenuStyles.generalContainer}>
					<View style={FullMenuStyles.menuContainer}>
						<Text style={FullMenuStyles.title}>Bonjour {userName} !</Text>
						<View
						style={[
							FullMenuStyles.buttonContainer
						]}
						>
							<Button
								left={true}
								text={styles.buttonText}
								onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthStats") : navigation.replace("Stats")}
							>
								Statistiques
							</Button>
							{/* {authCtx.isAuthenticated &&
								<Button
									text={styles.buttonText}
									onPress={() => navigation.replace("Settings")}
								>
									Paramètres
								</Button>
							} */}
							<Button
								text={styles.buttonText}
								onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthSettings") : navigation.replace("Settings")}
							>
								Paramètres
							</Button>
						</View>

						<Text style={FullMenuStyles.subTitle}>Nouvelle course</Text>
						<View
						style={[
							FullMenuStyles.buttonContainer
						]}
						>
							<Button
								left={true}
								text={styles.buttonText}
								onPress={() => {
									sendCommand({ cmd: 11, data: 1 });
									authCtx.isAuthenticated ? navigation.replace("AuthGame", { mode: "manual" }) : navigation.replace("Game", { mode: "manual" });
								}}
							>
								Mode manuel
							</Button>
							<Button
								text={styles.buttonText}
								onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthGame", { mode: "auto" }) : navigation.replace("Game", { mode: "auto" })}
							>
								Mode automatique
							</Button>
						</View>
					
						<FlatButton 
							onPress={() => authCtx.isAuthenticated ? signOutHandler() : navigation.replace("Welcome")}
						>
							{authCtx.isAuthenticated ? "Se déconnecter" : "Retour à la page de connexion"}
						</FlatButton>
					</View>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
}

export default MainMenuScreen;

const styles = StyleSheet.create({
	buttonText: {
		fontSize: Sizes.M,
	},
});
