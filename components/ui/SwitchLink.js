import { View, StyleSheet, Text } from "react-native";

import FlatButton from "./FlatButton";
import { Colors } from "../../constants/styles";

function SwitchLink({ question, link, onPress }) {
  return (
    <View style={styles.flatButton}>
      <Text style={styles.text}>{question}</Text>
      <FlatButton onPress={onPress}>{link}</FlatButton>
    </View>
  );
}

export default SwitchLink;

const styles = StyleSheet.create({
  flatButton: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: Colors.primary100,
  },
});
