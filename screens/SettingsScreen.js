import { useContext, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, ScrollView } from "react-native";

import SettingsForm from "../components/auth/SettingsForm";
import { AuthContext } from "../store/authContext";
import IconButton from "../components/ui/IconButton";
import FlatButton from "../components/ui/FlatButton";
import { Colors, Sizes, FullMenuStyles } from "../constants/styles";

function SettingsScreen({ navigation }) {
  	const authCtx = useContext(AuthContext);
	  const [credentialsInvalid, setCredentialsInvalid] = useState({
		username: false,
		password: false,
		confirmPassword: false,
	  });
	
	function submitHandler(credentials) {
		let { username, secretAnswer, password, confirmPassword } = credentials;
	
		username = username.trim();
		password = password.trim();
	
		const usernameIsValid = username.length >= 4;
		const passwordIsValid = password.length > 7;
		const passwordsAreEqual = password === confirmPassword;
	
		if (
			!usernameIsValid ||
			!passwordIsValid ||
			(!isLogin && !passwordsAreEqual)
		) {
			Alert.alert(
				"Entrée invalide, veuillez vérifier les informations que vous avez saisies."
			);
			setCredentialsInvalid({
				username: !usernameIsValid,
				password: !passwordIsValid,
				confirmPassword: !passwordIsValid || !passwordsAreEqual,
			});
		  return;
		}
		onAuthenticate({ username, password, secretAnswer });
	}

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
							<Text style={[FullMenuStyles.title]}>Paramètres</Text>
							<SettingsForm
								isLogin={false}
								onSubmit={submitHandler}
								credentialsInvalid={credentialsInvalid}
								isResetPwd={true}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
}

export default SettingsScreen;

const styles = StyleSheet.create({
	iconContainer:{
		flexDirection: "row",
		justifyContent: "flex-start",
		width: Sizes.full,
	},
	
});
