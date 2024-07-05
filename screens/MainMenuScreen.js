import { useContext } from "react";
import { Pressable, StyleSheet, Text, View, ImageBackground } from "react-native";

import { Colors, BackgroundImage, Sizes } from "../constants/styles";

import { AuthContext } from "../store/auth-context";
import Button from "../components/ui/Button";

function MainMenuScreen({ navigation }) {
  	const authCtx = useContext(AuthContext);
	var userName = "";
	if (authCtx.user)
	{
		userName = (authCtx.user.username ?? " " + authCtx.user.username);
	}
	return (
		<View style={styles.rootContainer}>
			<ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.generalContainer}>
				<View style={styles.menuContainer}>
					<Text style={styles.title}>Bonjour{userName} !</Text>
					<View
					style={[
						styles.buttonContainer
					]}
					>
						<Button
							children="Statistiques"
							left={true}
							onPress={() => navigation.replace("Stats")}
						></Button>
						<Button
							children= "Paramètres"
							left={false}
							onPress={() => navigation.replace("Settings")}
						></Button>
					</View>

					<Text style={styles.subTitle}>Nouvelle course</Text>
					<View
					style={[
						styles.buttonContainer
					]}
					>
						<Button
							children="Mode manuel"
							left={true}
							onPress={() => navigation.replace(userName === "" ? "Game" : "AuthGame")}
						></Button>
						<Button
							children="Mode automatique"
							left={false}
							onPress={() => navigation.replace(userName === "" ? "Game" : "AuthGame")}
						></Button>
					</View>
				
					<Pressable 
						style={[styles.linkButtons]}
						onPress={() => authCtx.logout()}
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
		height: Sizes.full,
	},
	generalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: Sizes.XXL,
		height: Sizes.full,
	},
	menuContainer: {
		backgroundColor: Colors.menuTransparentBlack,
		padding: Sizes.L,
		borderRadius: Sizes.S,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: Sizes.XL,
		fontWeight: "bold",
		marginBottom: Sizes.S,
		color: "white",
	},
	subTitle: {
		fontSize: Sizes.L,
		fontWeight: "bold",
		marginBottom: Sizes.S,
		color: "white",
	},
	buttonContainer: {
		marginTop: Sizes.L,
		marginBottom: Sizes.L,
		justifyContent: "space-between",
		flexDirection: "row",
		width: Sizes.full,
	},
	mainButtons: {
		borderRadius: Sizes.S,
		backgroundColor: "#B1B1B1",
		padding: Sizes.S,
	},
	linkButtons: {
		alignSelf: "flex-end",
	},
	linkText: {
		color: "#888888",
		textDecorationLine: "underline",
	}
});
