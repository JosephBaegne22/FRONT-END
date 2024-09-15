import { url } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonction générale d'authentification
async function authenticate(endpoint, params) {
  const { username, password, secretAnswer } = params;

  const body = {
    username: username,
    password: password,
  };

  if (secretAnswer) {
    body.secret_answer = secretAnswer;
  }

  const response = await fetch(`${url}${endpoint}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message ||
        "Une erreur est survenue, veuillez vérifier vos données ou réessayer plus tard !"
    );
    error.data = data;
    throw error;
  }

  return data;
}

// Créer un utilisateur
export function createUser(username, password, secretAnswer) {
  return authenticate("api/signup", { username, password, secretAnswer });
}

// Connexion utilisateur
export function login(username, password) {
  return authenticate("api/signin", { username, password });
}

// Réinitialisation du mot de passe
export function resetPassword(username, password, secretAnswer) {
  return authenticate("api/resetPwd", { username, password, secretAnswer });
}

// Déconnexion
export async function signOut(authCtx) {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${url}api/signOut`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message ||
        "Une erreur est survenue lors de la déconnexion. Veuillez réessayer plus tard!"
    );
    error.data = data;
    throw error;
  }

  AsyncStorage.removeItem("token");
  authCtx.logout();
  return data;
}

// Fonction pour mettre à jour les informations de l'utilisateur (nom d'utilisateur et mot de passe)
export async function updateUser(username, newPassword, secretAnswer) {
   const token = await AsyncStorage.getItem("token");

   const body = {
      username: username,
      password: newPassword,
      secret_answer: secretAnswer,
   };

   console.log(body);

   const response = await fetch(`${url}/api/user`, {
      method: "PUT",
      headers: {
         "Content-type": "application/json",
         Authorization: `Bearer ${token}`,  // Ajout du jeton d'accès
      },
      body: JSON.stringify(body),
   });

   const data = await response.json();

   if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la mise à jour des informations utilisateur");
   }

   return data;
}
