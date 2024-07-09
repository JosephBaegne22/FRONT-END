import { useContext } from "react";
import { Pressable, StyleSheet, Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthContext } from "../store/auth-context";
import Button from "../components/ui/Button";
import { Colors, Sizes, FullMenuStyles } from "../constants/styles";

function ManualGameEndMenuScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  return (
    <View style={FullMenuStyles.rootContainer}>
		<ImageBackground source={require("../assets/image_fond_menu.jpg")} resizeMode="cover" style={FullMenuStyles.backgroundImage}>
			<SafeAreaView style={FullMenuStyles.generalContainer}>
				<View style={FullMenuStyles.menuContainer}>
					<Text style={FullMenuStyles.title}>Course terminée</Text>
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
	
});
