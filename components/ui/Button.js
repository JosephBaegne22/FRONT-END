import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "../../constants/styles";

function Button({ children, onPress, size, text }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, size]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, text]}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
