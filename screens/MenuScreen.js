import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { AuthContext } from "../store/auth-context";

function MenuScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Page de menu</Text>
      <Button
        title="Nouvelle course"
        onPress={() => navigation.replace("Game")}
      ></Button>
      <Button title="Se déconnecter" onPress={() => authCtx.logout()}></Button>
    </View>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
