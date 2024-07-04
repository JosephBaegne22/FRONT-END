import { useContext, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, ImageBackground, Alert } from "react-native";

import { AuthContext } from "../store/auth-context";
import { signOut } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";

function MainMenuScreen({ navigation }) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

async function signOutHandler() {
  setIsSigningOut(true);
  try {
      const res = await signOut(authCtx);
      const successMessage = SUCCESS_MESSAGES[res.message] || res.message;
      setMessage(successMessage);
    } catch (error) {
      const errorMessage = ERROR_MESSAGES[error.data.message] || "Une erreur est survenue lors de la déconnexion. Veuillez réessayer plus tard!";
      setError(errorMessage);
    } finally {
      setIsSigningOut(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
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

  return (
    <View style={styles.rootContainer}>
		<ImageBackground source={"https://cloudfront-eu-central-1.images.arcpublishing.com/lpguideshopping/UXTKG3TYGJFKZGOOQJGPTXXRSI.jpg"} resizeMode="cover" style={styles.generalContainer}>
			<View style={styles.menuContainer}>
				<Text style={styles.title}>Bonjour !</Text>
				<View
				style={[
					styles.buttonContainer
				]}
				>
					<Pressable
						style={[styles.leftButtons, styles.mainButtons]}
						onPress={() => navigation.replace("Stats")}
					>
						<Text>Statistiques</Text>
					</Pressable>
					<Pressable
						style={[styles.mainButtons]}
						onPress={() => navigation.replace("Settings")}
					>
						<Text>Paramètres</Text>
					</Pressable>
				</View>

				<Text style={styles.subTitle}>Nouvelle course</Text>
				<View
				style={[
					styles.buttonContainer
				]}
				>
					<Pressable
						style={[styles.leftButtons, styles.mainButtons]}
						onPress={() => navigation.replace("Game")}
					>
						<Text>Mode manuel</Text>
					</Pressable>
					<Pressable
						style={[styles.mainButtons]}
						onPress={() => navigation.replace("Game")}
					>
						<Text>Mode automatique</Text>
					</Pressable>
				</View>
			
				<Pressable 
					style={[styles.linkButtons]}
					onPress={() => signOutHandler()}
				>
					<Text style={[styles.linkText]}>Se déconnecter</Text>
				</Pressable>
			</View>
		</ImageBackground>
    </View>
  );
}

export default MainMenuScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		height: "100%",
	},
	generalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
		height: "100%",
	},
	menuContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		padding: 20,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
		color: "white",
	},
	subTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
		color: "white",
	},
	buttonContainer: {
		marginTop: 20,
		marginBottom: 20,
		justifyContent: "space-between",
		flexDirection: "row",
		width: "100%",
	},
	mainButtons: {
		borderRadius: 8,
		backgroundColor: "#B1B1B1",
		padding: 8,
	},
	leftButtons: {
		marginRight: 20,
	},
	mainButtons: {
		borderRadius: 8,
		backgroundColor: "#B1B1B1",
		padding: 8,
	},
	linkButtons: {
		alignSelf: "flex-end",
	},
	linkText: {
		color: "#888888",
		textDecorationLine: "underline",
	}
});
