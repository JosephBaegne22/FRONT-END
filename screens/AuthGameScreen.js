import { Text, StyleSheet, View, Button } from "react-native";

function AuthGameScreen({ navigation }) {
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

export default AuthGameScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
