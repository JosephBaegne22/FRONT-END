import { useContext } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from "react-native";

import { AuthContext } from "../store/authContext";
import Button from "../components/ui/Button";
import EndGameTable from "../components/tables/EndGameTable";
import { Sizes, FullMenuStyles } from "../constants/styles";

function GameEndMenuScreen({ navigation }) {
  	const authCtx = useContext(AuthContext);
	// fake data we will need to get in some other way
	const fakeRaceData = {
		averageSpeed: 42,
		highestSpeed: 61,
		raceTime: 100,
		hitCount: 5,
		finished: false,
	};
	const fakeBestData = {
		averageSpeed: 48,
		highestSpeed: 67,
		raceTime: 72,
		hitCount: 1,
	};
	const raceMode = "auto";
	// end of fake data
	return (
		<View style={FullMenuStyles.rootContainer}>
			<ImageBackground source={require("../assets/image_fond_menu.jpg")} resizeMode="cover" style={FullMenuStyles.backgroundImage}>
				<SafeAreaView style={FullMenuStyles.generalContainer}>
					<View style={FullMenuStyles.menuContainer}>
						<Text style={[FullMenuStyles.title, styles.title]}>Course terminée</Text>
						{raceMode === "auto" &&
							<Text style={[FullMenuStyles.subTitle, styles.subTitle]}>
								{fakeRaceData.finished ? "Course terminée !" : "Course non terminée. La ligne de guidage a été perdue."}
							</Text>
						}
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
								onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthMainMenu") : navigation.replace("MainMenu")}
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

export default GameEndMenuScreen;

const styles = StyleSheet.create({
	title:{
		marginTop: Sizes.M,
	},
	subTitle:{
		// marginTop: Sizes.M,
	},
});
