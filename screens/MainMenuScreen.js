import { useContext } from "react";
import { Pressable, StyleSheet, Text, View, ImageBackground } from "react-native";

import { AuthContext } from "../store/auth-context";

function MainMenuScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  return (
    <View>
		<ImageBackground source={"https://cloudfront-eu-central-1.images.arcpublishing.com/lpguideshopping/UXTKG3TYGJFKZGOOQJGPTXXRSI.jpg"} resizeMode="cover" style={styles.rootContainer}>
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
