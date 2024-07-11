import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { useContext } from "react";
import { Entypo } from "@expo/vector-icons";

import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/styles";
import IconButton from "../components/ui/IconButton";

function GameScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.settingButton}>
        <IconButton
          icon={"settings-sharp"}
          size={32}
          color={Colors.primary300}
          onPress={() =>
            authCtx.isAuthenticated
			  ? navigation.replace("AuthInGameMenu")
              : navigation.replace("InGameMenu")
          }
        ></IconButton>
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Entypo
              name="arrow-left"
              color={Colors.primary500}
              size={80}
            ></Entypo>
            <Entypo
              name="arrow-right"
              color={Colors.primary500}
              size={80}
            ></Entypo>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: "auto" }}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.image}
              source={require("../assets/gameScreenImages/speedometer.png")}
            ></Image>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Entypo
              name="arrow-up"
              color={Colors.primary500}
              size={80}
            ></Entypo>
            <Entypo
              name="arrow-down"
              color={Colors.primary500}
              size={80}
            ></Entypo>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    height: 90,
    width: 180,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingButton: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },
});
