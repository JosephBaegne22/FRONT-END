import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons, Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";

const iconLibraries = {
  Ionicons: Ionicons,
  Entypo: Entypo,
  AntDesign: AntDesign,
  FontAwesome: FontAwesome
};

function IconButton({ icon, color, size, onPress, style, library, text, textStyle }) {
  const IconComponent = iconLibraries[library];
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {IconComponent && <IconComponent name={icon} color={color} size={size} />}
        {text && <View style={[styles.overlay, styles.content]}><Text style={[textStyle]}>{text}</Text></View>}
      </View>
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
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
