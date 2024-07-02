import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../store/auth-context";

function MainMenuScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.rootContainer}>
		<Text style={styles.title}>Bonjour !</Text>
		<View
          style={[
            styles.buttonContainer,
            { flexDirection: "row" },
          ]}
        >
			<Button
				title="Statistiques"
				onPress={() => navigation.replace("Stats")}
			></Button>
			<Button
				title="Paramètres"
				onPress={() => navigation.replace("Settings")}
			></Button>
		</View>

		<Text style={styles.subTitle}>Nouvelle course</Text>
		<View
          style={[
            styles.buttonContainer,
            { flexDirection: "row" },
          ]}
        >
			<Button
				title="Mode manuel"
				onPress={() => navigation.replace("Game")}
			></Button>
			<Button
				title="Mode automatique"
				onPress={() => navigation.replace("Game")}
			></Button>
		</View>
	
		<Button title="Se déconnecter" onPress={() => authCtx.logout()}></Button>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
	justifyContent: "space-between",
    // alignItems: "center",
  },
});
