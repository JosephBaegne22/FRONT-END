import { Pressable, StyleSheet, Text } from "react-native";

import { Colors, Sizes } from "../../constants/styles";

function Button({ children, onPress, size, text , left }) {
	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.pressed, left && styles.leftButton, size]}
			onPress={onPress}
		>
			<Text style={[styles.buttonText, text]}>{children}</Text>
		</Pressable>
	);
}

export default Button;

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.buttonGrey,
	},
	leftButton: {
		marginRight: Sizes.L,
	},
	pressed: {
		backgroundColor: Colors.buttonGreyPressed,
		elevation: 2,
		shadowColor: "black",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	buttonText: {
		textAlign: "center",
		fontWeight: "bold",
	},
});
