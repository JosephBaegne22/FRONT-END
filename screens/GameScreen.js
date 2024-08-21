import { StyleSheet, View, Image, Pressable, Platform } from "react-native";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
          library={"Ionicons"}
        ></IconButton>
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <IconButton
              icon={"arrow-left"}
              size={80}
              color={Colors.primary300}
              library={"Entypo"}
            ></IconButton>
            <IconButton
              icon={"arrow-right"}
              size={80}
              color={Colors.primary300}
              library={"Entypo"}
            ></IconButton>
          </View>
        </View>
        <View style={{ flex: 1, marginTop: "auto" }}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.speedometerImage}
              source={require("../assets/gameScreenImages/speedometer.png")}
            ></Image>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <IconButton
              icon={"arrow-up"}
              size={80}
              color={Colors.primary300}
              library={"Entypo"}
            ></IconButton>
            <IconButton
              icon={"arrow-down"}
              size={80}
              color={Colors.primary300}
              library={"Entypo"}
            ></IconButton>
          </View>
          <Pressable
            style={({ pressed }) => [
              { flex: 1, justifyContent: "center", paddingLeft: 10 },
              pressed && styles.pressed,
            ]}
          >
            <Image
              style={styles.brakeImage}
              source={require("../assets/gameScreenImages/brake.png")}
            ></Image>
          </Pressable>
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
  speedometerImage: {
    height: 90,
    width: 180,
  },
  brakeImage: {
    height: 50,
    width: 90,
  },
  pressed: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        opacity: 0.6,
      },
    }),
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
