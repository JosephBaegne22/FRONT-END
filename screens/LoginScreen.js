import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Échec de connexion!",
        "Impossible de vous connecter. Veuillez vérifier vos informations d'identification ou réessayer plus tard!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Connexion en cours..." />;
  }

  return (
    <AuthContent
      isLogin
      onAuthenticate={loginHandler}
      title="Merci de vous connecter"
      style={{ paddingTop: 96 }}
    />
  );
}

export default LoginScreen;
