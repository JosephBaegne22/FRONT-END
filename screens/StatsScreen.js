import { useContext } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView } from "react-native";

import IconButton from "../components/ui/IconButton";
import { AuthContext } from "../store/authContext";
import StatsTable from "../components/tables/StatsTable";
import { Colors, Sizes, FullMenuStyles } from "../constants/styles";

function StatsScreen({ navigation }) {
  	const authCtx = useContext(AuthContext);
	// fake data we will need to get in some other way
	const fakeManualRaceNumber = 6;
	const fakeAutoRaceNumber = 7;
	const fakeFinishedAutoRaceNumber = 5;
	const fakeData = {
		average: {
			averageSpeed: 42,
			highestSpeed: 61,
			raceTime: 100,
			hitCount: 5,
		},
		best: {
			averageSpeed: 48,
			highestSpeed: 67,
			raceTime: 72,
			hitCount: 1,
		}
	};
	// end of fake data

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
							<Text style={[FullMenuStyles.title]}>Statistiques</Text>
							<Text style={[FullMenuStyles.subTitle, styles.subTitle]}>Mode manuel</Text>
							<Text style={styles.text}>{fakeManualRaceNumber} courses effectuées</Text>
							<StatsTable
								data={fakeData}
							/>
							<Text style={[FullMenuStyles.subTitle, styles.subTitle]}>Mode automatique</Text>
							<Text style={styles.text}>{fakeFinishedAutoRaceNumber} courses terminées sur {fakeAutoRaceNumber} effectuées</Text>
							<StatsTable
								data={fakeData}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
}

export default StatsScreen;

const styles = StyleSheet.create({
	iconContainer:{
		flexDirection: "row",
		justifyContent: "flex-start",
		width: Sizes.full,
	},
	subTitle:{
		marginTop: Sizes.M,
	},
	text:{
		marginBottom: Sizes.M,
		color: "white",
	}
});
