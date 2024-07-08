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
		borderRadius: Sizes.XS,
		paddingVertical: Sizes.XS,
		paddingHorizontal: Sizes.S,
		backgroundColor: Colors.primary500,
		elevation: Sizes.XXS,
		shadowColor: "black",
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
	},
	leftButton: {
		marginRight: Sizes.L,
	},
	pressed: {
		opacity: 0.7,
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});