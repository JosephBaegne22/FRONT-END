
import { StyleSheet } from "react-native";

export const Colors = {
  primary100: "#FAFAFA",
  primary300: "#949494",
  primary500: "#696969",
  primary800: "#262626",
  error100: "#fcdcbf",
  error500: "#f37c13",
  menuTransparentBlack: "rgba(0, 0, 0, 0.8)",
};

export const Sizes = {
	XXS: 2,
	XS: 6,
	S: 12,
	M: 16,
	L: 20,
	XL: 24,
	XXL: 32,
	full: "100%",
};

export const TitleStyle = {
	fontSize: Sizes.XL,
	fontWeight: "bold",
	marginBottom: Sizes.S,
	color: "white",
};

export const FullMenuStyles = StyleSheet.create({
	rootContainer: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
	},
	generalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: Sizes.XXL,
	},
	menuContainer: {
		backgroundColor: Colors.menuTransparentBlack,
		padding: Sizes.L,
		borderRadius: Sizes.S,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: Sizes.XL,
		fontWeight: "bold",
		marginBottom: Sizes.S,
		color: "white",
	},
	subTitle: {
		fontSize: Sizes.L,
		fontWeight: "bold",
		marginBottom: Sizes.S,
		color: "white",
	},
	buttonContainer: {
		marginTop: Sizes.L,
		marginBottom: Sizes.L,
		justifyContent: "space-between",
		flexDirection: "row",
		width: Sizes.full,
	},
	buttonText: {
		fontSize: Sizes.M,
	},
});