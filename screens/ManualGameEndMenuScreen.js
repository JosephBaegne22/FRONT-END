import { useContext } from "react";
import { Pressable, StyleSheet, Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../store/auth-context";
import Button from "../components/ui/Button";
import EndGameTable from "../components/tables/EndGameTable";
import { Colors, Sizes, FullMenuStyles } from "../constants/styles";

function ManualGameEndMenuScreen({ navigation }) {
  	const authCtx = useContext(AuthContext);
	const fakeRaceData = {
		averageSpeed: 42,
		highestSpeed: 61,
		raceTime: 100,
		hitCount: 5,
	}
	const fakeBestData = {
		averageSpeed: 48,
		highestSpeed: 67,
		raceTime: 72,
		hitCount: 1,
	}
	return (
		<View style={FullMenuStyles.rootContainer}>
			<ImageBackground source={require("../assets/image_fond_menu.jpg")} resizeMode="cover" style={FullMenuStyles.backgroundImage}>
				<SafeAreaView style={FullMenuStyles.generalContainer}>
					<View style={FullMenuStyles.menuContainer}>
						<Text style={[FullMenuStyles.title, styles.title]}>Course terminée</Text>
						<EndGameTable
							raceData={fakeRaceData}
							bestData={fakeBestData}
						/>
						<View
						style={[
							FullMenuStyles.buttonContainer
						]}
						>
							<Button
								left={true}
								text={FullMenuStyles.buttonText}
								onPress={() => authCtx.isAuthenticated ? navigation.replace("MainAuthMenu") : navigation.replace("MainMenu")}
							>
								Menu principal
							</Button>
							<Button
								text={FullMenuStyles.buttonText}
								onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthGame") : navigation.replace("Game")}
							>
								Rejouer
							</Button>
						</View>
					</View>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
}

export default ManualGameEndMenuScreen;

const styles = StyleSheet.create({
	title:{
		marginTop: Sizes.M,
	}
});
