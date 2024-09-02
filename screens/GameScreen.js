import { StyleSheet, View, Image, Pressable, Platform } from "react-native";
import { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";

import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { getSocket } from "../util/websocket";
import { VIDEO_URL } from "@env";

function GameScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const socket = getSocket();

  const sendCommand = (command) => {
    socket.emit("car-control", command);
  };

  useEffect(() => {
    // Activer le flux vidéo
    sendCommand({ cmd: 9, data: 1 });

    return () => {
      // Désactiver le flux vidéo
      sendCommand({ cmd: 9, data: 0 });
    };
  }, [socket]);

  const handleForward = () => {
    sendCommand({ cmd: 1, data: [2000, 2000, 2000, 2000] });
  };

  const handleBackward = () => {
    sendCommand({ cmd: 1, data: [-2000, -2000, -2000, -2000] });
  };

  const handleLeft = () => {
    sendCommand({ cmd: 1, data: [-1000, 1000, -1000, 1000] });
  };

  const handleRight = () => {
    sendCommand({ cmd: 1, data: [1000, -1000, 1000, -1000] });
  };

  const handleBrake = () => {
    sendCommand({ cmd: 1, data: [0, 0, 0, 0] });
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* <Video
        source={{ uri: VIDEO_URL }}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat={true}
        muted={true}
      />*/}
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
              onPress={handleLeft}
              library={"Entypo"}
            ></IconButton>
            <IconButton
              icon={"arrow-right"}
              size={80}
              color={Colors.primary300}
              onPress={handleRight}
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
              onPress={handleForward}
              library={"Entypo"}
            ></IconButton>
            <IconButton
              icon={"arrow-down"}
              size={80}
              color={Colors.primary300}
              onPress={handleBackward}
              library={"Entypo"}
            ></IconButton>
          </View>
          <Pressable
            style={({ pressed }) => [
              { flex: 1, justifyContent: "center", paddingLeft: 10 },
              pressed && styles.pressed,
            ]}
            onPress={handleBrake}
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
  /*backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },*/
});
