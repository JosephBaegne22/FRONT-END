import { Text, StyleSheet, View, Button } from "react-native";

function GameScreen({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Page de jeu</Text>
      <Button
        title="Quitter"
        onPress={() => navigation.replace("Menu")}
      ></Button>
    </View>
  );
}

export default GameScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
