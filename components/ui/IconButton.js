import { Pressable, StyleSheet } from "react-native";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

const iconLibraries = {
  Ionicons: Ionicons,
  Entypo: Entypo,
  AntDesign: AntDesign
};

function IconButton({ icon, color, size, onPress, style, library }) {
  const IconComponent = iconLibraries[library];
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      onPress={onPress}
    >
      {IconComponent && <IconComponent name={icon} color={color} size={size} />}
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
