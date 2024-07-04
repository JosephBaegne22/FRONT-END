import { useContext, useState, useEffect } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ username, password }) {
    setIsAuthenticating(true);
    try {
      const data = await login(username, password);
      const token = data.payload.token;
      authCtx.authenticate(token);

      const successMessage =
        SUCCESS_MESSAGES["USER_LOGGED_IN"] || "Connexion réussie !";
      setMessage(successMessage);
    } catch (error) {
      const errorMessage =
        ERROR_MESSAGES[error.data.message] ||
        "Impossible de vous connecter. Veuillez vérifier vos informations d'identification ou réessayer plus tard!";
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
    return <LoadingOverlay message="Connexion en cours..." />;
  }

  return (
    <AuthContent
      isLogin
      onAuthenticate={loginHandler}
      title="Merci de vous connecter"
      style={{ paddingTop: 16 }}
    />
  );
}

export default LoginScreen;
