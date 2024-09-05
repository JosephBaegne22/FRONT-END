import { useContext } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from "react-native";

import { AuthContext } from "../store/auth-context";

import Button from "../components/ui/Button";
import { Sizes, FullMenuStyles } from "../constants/styles";

function InGameMenuScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  return (
    <View style={FullMenuStyles.rootContainer}>
		<ImageBackground source={require("../assets/image_fond_menu.jpg")} resizeMode="cover" style={FullMenuStyles.backgroundImage}>
			<SafeAreaView style={FullMenuStyles.generalContainer}>
				<View style={FullMenuStyles.menuContainer}>
					<View style={styles.buttonContainer}>
						<Text style={FullMenuStyles.title}>Jeu en pause</Text>
						<Button
							size={styles.button}
							onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthGame") : navigation.replace("Game")}
						>
							Reprendre
						</Button>
						<Button
							size={styles.button}
							onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthGame") : navigation.replace("Game")}
						>
							Recommencer
						</Button>		
						<Button
							size={styles.button}
							onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthMainMenu") : navigation.replace("MainMenu")}
						>
							Abandonner
						</Button>
						<Button
							size={styles.button}
							onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthMainMenu") : navigation.replace("MainMenu")}
						>
							Terminer la course
						</Button>		
					</View>
				</View>
			</SafeAreaView>
		</ImageBackground>
    </View>
  );
}

export default InGameMenuScreen;

const styles = StyleSheet.create({
	buttonContainer: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "column",
	},
	button: {
		marginTop: Sizes.L,
	}
});
