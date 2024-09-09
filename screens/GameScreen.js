import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Platform,
  Dimensions,
  Alert,
  Text,
} from "react-native";
import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/styles";
import IconButton from "../components/ui/IconButton";
import { getSocket } from "../util/websocket";
import { VIDEO_URL } from "@env";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function GameScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const socket = getSocket();
  const [cam_x, setCam_x] = useState(90);
  const [cam_y, setCam_y] = useState(90);
  const [speed, setSpeed] = useState(2000);
  const [direction, setDirection] = useState("");

  const { mode } = route.params;

  const sendCommand = (command) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(command));
    } else {
      Alert.alert(
        "Erreur de connexion",
        "La connexion avec le serveur n'est pas établie. Veuillez réessayer plus tard."
      );
    }
  };

  const handleForward = () => {
    setDirection("forward");
    sendCommand({ cmd: 1, data: [speed, speed, speed, speed] });
  };

  const handleBackward = () => {
    setDirection("backward");
    sendCommand({ cmd: 1, data: [-speed, -speed, -speed, -speed] });
  };

  const handleLeft = () => {
    setDirection("left");
    sendCommand({ cmd: 1, data: [0, 0, speed, speed] });
  };

  const handleRight = () => {
    setDirection("right");
    sendCommand({ cmd: 1, data: [speed, speed, 0, 0] });
  };

  const handleBrake = () => {
    setDirection("break");
    sendCommand({ cmd: 1, data: [0, 0, 0, 0] });
  };

  const handleCamRight = () => {
    if (cam_x > 10) {
      setCam_x(cam_x - 10);
    }
    sendCommand({ cmd: 3, data: [cam_x, cam_y] });
  };

  const handleCamLeft = () => {
    if (cam_x < 180) {
      setCam_x(cam_x + 10);
    }
    sendCommand({ cmd: 3, data: [cam_x, cam_y] });
  };

  const handleCamUp = () => {
    if (cam_y < 180) {
      setCam_y(cam_y + 10);
    }
    sendCommand({ cmd: 3, data: [cam_x, cam_y] });
  };

  const handleCamDown = () => {
    setCam_y(cam_y - 10);
    sendCommand({ cmd: 3, data: [cam_x, cam_y] });
  };

  const handleCamReset = () => {
    setCam_x(90);
    setCam_y(90);
    sendCommand({ cmd: 3, data: [cam_x, cam_y] });
  };

  const handleSpeedUp = () => {
    if (speed < 4000) {
      setSpeed(speed + 200);
      switch (direction) {
        case "forward":
          handleForward();
          break;
        case "backward":
          handleBackward();
          break;
        case "left":
          handleLeft();
          break;
        case "right":
          handleRight();
          break;
        default:
          console.log("speed up : " + speed);
          break;
      }
    }
  };

  const handleSpeedDown = () => {
    if (speed > 200) {
      setSpeed(speed - 200);
      switch (direction) {
        case "forward":
          handleForward();
          break;
        case "backward":
          handleBackward();
          break;
        case "left":
          handleLeft();
          break;
        case "right":
          handleRight();
          break;
        default:
          console.log("speed down : " + speed);
          break;
      }
    }
  };

  const handleAutoActivate = () => {
    sendCommand({ cmd: 10, data: 1 });
  };

  const handleAutoDesactivate = () => {
    sendCommand({ cmd: 10, data: 0 });
  };

  return (
    <>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: VIDEO_URL }}
        style={styles.backgroundWebView}
        onLoadProgress={({ nativeEvent }) => {
          if (nativeEvent.progress === 1) {
            setIsLoading(false);
          }
        }}
        onError={() => {
          setIsLoading(false);
          Alert.alert(
            "Erreur lors du chargement de la caméra, veuillez réessayer plus tard",
            "",
            [
              {
                text: "OK",
                onPress: () =>
                  authCtx.isAuthenticated
                    ? navigation.replace("AuthInGameMenu", { mode: mode })
                    : navigation.replace("InGameMenu", { mode: mode }),
              },
            ]
          );
        }}
      />
      <View style={styles.overlay}>
        {isLoading && <LoadingOverlay message="Chargement de la caméra..." />}
      </View>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.rootContainer}>
          <View style={styles.settingButton}>
            <IconButton
              icon={"settings-sharp"}
              size={32}
              color={Colors.primary300}
              onPress={() =>
                authCtx.isAuthenticated
                  ? navigation.replace("AuthInGameMenu", { mode: mode })
                  : navigation.replace("InGameMenu", { mode: mode })
              }
              library={"Ionicons"}
            ></IconButton>
          </View>
          <View style={styles.arrowsContainer}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <IconButton
                icon={"circle"}
                size={60}
                color={Colors.primary300}
                onPress={handleCamReset}
                library={"FontAwesome"}
              ></IconButton>
              <View
                style={[
                  styles.overlay,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <Text style={styles.resetButton}>Reset</Text>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                marginRight: "auto",
                marginLeft: 10,
              }}
            >
              <IconButton
                icon={"upcircleo"}
                size={35}
                color={Colors.primary300}
                onPress={handleCamUp}
                library={"AntDesign"}
              ></IconButton>
              <View
                style={[
                  styles.container,
                  { justifyContent: "space-between", width: 107 },
                ]}
              >
                <IconButton
                  icon={"leftcircleo"}
                  size={35}
                  color={Colors.primary300}
                  onPress={handleCamLeft}
                  library={"AntDesign"}
                ></IconButton>
                <IconButton
                  icon={"rightcircleo"}
                  size={35}
                  color={Colors.primary300}
                  onPress={handleCamRight}
                  library={"AntDesign"}
                ></IconButton>
              </View>
              <IconButton
                icon={"downcircleo"}
                size={35}
                color={Colors.primary300}
                onPress={handleCamDown}
                library={"AntDesign"}
              ></IconButton>
            </View>
            <View style={{ justifyContent: "space-around", height: 95 }}>
              <IconButton
                icon={"pluscircle"}
                size={35}
                color={Colors.primary300}
                onPress={handleSpeedUp}
                library={"AntDesign"}
              ></IconButton>
              <IconButton
                icon={"minuscircle"}
                size={35}
                color={Colors.primary300}
                onPress={handleSpeedDown}
                library={"AntDesign"}
              ></IconButton>
            </View>
          </View>
          <View style={styles.container}>
            {mode === "auto" && (
              <View style={{ flex: 1 }}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <IconButton
                    icon={"circle"}
                    size={110}
                    color={Colors.primary300}
                    onPress={handleAutoDesactivate}
                    library={"FontAwesome"}
                  ></IconButton>
                  <View
                    style={[
                      styles.overlay,
                      { justifyContent: "center", alignItems: "center" },
                    ]}
                  >
                    <Text style={styles.autoButton}>Arrêter</Text>
                  </View>
                </View>
              </View>
            )}
            {mode === "manual" && (
              <View style={{ flex: 1 }}>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
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
            )}
            <View style={{ flex: 1, marginTop: "auto" }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  style={styles.speedometerImage}
                  source={require("../assets/gameScreenImages/speedometer.png")}
                ></Image>
                <View
                  style={[
                    styles.overlay,
                    { justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  <Text style={styles.speed}>{speed}</Text>
                </View>
              </View>
            </View>
            {mode === "auto" && (
              <View style={{ flex: 1 }}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <IconButton
                    icon={"circle"}
                    size={110}
                    color={Colors.primary300}
                    onPress={handleAutoActivate}
                    library={"FontAwesome"}
                  ></IconButton>
                  <View
                    style={[
                      styles.overlay,
                      { justifyContent: "center", alignItems: "center" },
                    ]}
                  >
                    <Text style={styles.autoButton}>Démarrer</Text>
                  </View>
                </View>
              </View>
            )}
            {mode === "manual" && (
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
            )}
          </View>
        </SafeAreaView>
      </View>
    </>
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
  arrowsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Platform.OS === "ios" ? 5 : 30,
  },
  settingButton: {
    alignItems: "flex-end",
    marginRight: Platform.OS === "ios" ? 0 : 25,
    marginTop: Platform.OS === "ios" ? 40 : 15,
  },
  backgroundWebView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  autoButton: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButton: {
    fontSize: 12,
    fontWeight: "bold",
  },
  speed: {
    color: Colors.primary100,
    fontSize: 18,
    fontWeight: "bold",
  },
});
