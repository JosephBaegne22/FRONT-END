import { useState, useEffect } from "react";
import { Alert, Dimensions } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser, resetPassword } from "../util/auth";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";

function SignupScreen({ route }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const isResetPwd = route.params?.resetPwd;
  const deviceHeight = Dimensions.get("window").height;

  async function signupHandler({ username, password, secretAnswer }) {
    setIsAuthenticating(true);
    try {
      let res;
      if (isResetPwd) {
        res = await resetPassword(username, password, secretAnswer);
      } else {
        res = await createUser(username, password, secretAnswer);
      }
      const successMessage = SUCCESS_MESSAGES[res.message] || res.message;
      setMessage(successMessage);
    } catch (error) {
      const errorMessage =
        ERROR_MESSAGES[error.data.message] ||
        "Une erreur est survenue, veuillez vérifier vos données ou réessayez plus tard !";
      setError(errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  }

  useEffect(() => {
    if (message) {
      Alert.alert(message);
      setMessage("");
    }
    if (error) {
      Alert.alert(error);
      setError(null);
    }
  }, [message, error]);

  if (isAuthenticating) {
    return (
      <LoadingOverlay
        message={
          isResetPwd ? "Mise à jour en cours..." : "Inscription en cours..."
        }
      />
    );
  }

  return (
    <AuthContent
      onAuthenticate={signupHandler}
      title={
        isResetPwd ? "Mise à jour du mot de passe" : "Veuillez vous inscrire !"
      }
      isResetPwd={isResetPwd}
      style={{
        paddingTop: isResetPwd
          ? deviceHeight > 400
            ? 12
            : 32
          : deviceHeight > 400
          ? 26
          : 48,
      }}
    />
  );
}

export default SignupScreen;
