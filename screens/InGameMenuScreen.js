import { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, Alert } from "react-native";

import { AuthContext } from "../store/authContext";

import Button from "../components/ui/Button";
import { Sizes, FullMenuStyles } from "../constants/styles";
import { endGame } from "../util/auth";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants/messages";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function InGameMenuScreen({ navigation, route }) {
  const [IsEndingGame, setIsEndingGame] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const { mode, seconds, minutes, hours, speed} = route.params;

  const vMax = route.params?.vMax;
  const vMin = route.params?.vMin;
  const startAt = route.params?.startAt;

  const duration = seconds + (minutes * 60) + (hours * 3600);
  
  const getCurrentDateTime = () => {
	const now = new Date();
	const isoString = now.toISOString();
	return isoString;
  };

  async function endGameHandler(vMin, vMax, startAt, endAt, duration, mode) {
    setIsEndingGame(true);
    try {
      const data = await endGame(vMin, vMax, startAt, endAt, duration, mode);

      const successMessage =
        SUCCESS_MESSAGES[data.message] || "Course terminée avec succès !";
      setMessage(successMessage);

	  navigation.replace("AuthMainMenu");
    } catch (error) {
      let errorMessage;

      if (error?.data?.message) {
        errorMessage = ERROR_MESSAGES[error.data.message] || "Impossible de terminer la course. Veuillez réessayer plus tard!";
      } else {
        errorMessage =
          "Impossible de terminer la course. Veuillez réessayer plus tard!";
      }
      setError(errorMessage);
    } finally {
      setIsEndingGame(false);
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

  if (IsEndingGame) {
    return <LoadingOverlay message="Fin de la course en cours..." />;
  }

  return (
    <View style={FullMenuStyles.rootContainer}>
		<ImageBackground source={require("../assets/image_fond_menu.jpg")} resizeMode="cover" style={FullMenuStyles.backgroundImage}>
			<SafeAreaView style={FullMenuStyles.generalContainer}>
				<View style={FullMenuStyles.menuContainer}>
					<View style={styles.buttonContainer}>
						<Text style={FullMenuStyles.title}>Jeu en pause</Text>
						<Button
							size={styles.button}
							onPress={() => authCtx.isAuthenticated ? navigation.replace("AuthGame", { 
								mode: mode,
								seconds: seconds, 
								minutes: minutes, 
								hours: hours, 
								speed: speed,
								vMax: vMax,
								vMin: vMin,
								startAt: startAt
							  }) : navigation.replace("Game", { 
								mode: mode,
								seconds: seconds, 
								minutes: minutes, 
								hours: hours, 
								speed: speed
							  })}
						>
							Reprendre
						</Button>
						<Button
							size={styles.button}
							onPress={() => {
								const startAt = getCurrentDateTime();
								const params = { mode: mode };
								if (mode === "manual") {
									params.startAt = startAt;
								}
								authCtx.isAuthenticated ? navigation.replace("AuthGame", params) : navigation.replace("Game", {mode: mode})}}
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
							onPress={() => {
								if(authCtx.isAuthenticated){
									const endAt = getCurrentDateTime();
									authCtx.setRace({
										vMin: vMin,
										vMax: vMax,
										startAt: startAt,
										endAt: endAt,
										duration: duration,
										mode: mode
									})
									endGameHandler(vMin, vMax, startAt, endAt, duration, mode)
								} else {
									navigation.replace("MainMenu")
								}
								}}
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
