import { url } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        "Une erreur est survenue, veuillez vérifier vos données ou réessayez plus tard !"
    );
    error.data = data;
    throw error;
  }

  return data;
}

export function createUser(username, password, secretAnswer) {
  return authenticate("api/signup", { username, password, secretAnswer });
}

export function login(username, password) {
  return authenticate("api/signin", { username, password });
}

export function resetPassword(username, password, secretAnswer) {
  return authenticate("api/resetPwd", { username, password, secretAnswer });
}

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

export async function endGame(vMin, vMax, startAt, endAt, duration, mode){
  const token = await AsyncStorage.getItem("token");

  mode = mode.toUpperCase();
  
  const body = {
    vMin: vMin,
    vMax: vMax,
    startAt: startAt,
    endAt: endAt,
    duration: duration,
    mode: mode
  };

  const response = await fetch(`${url}api/race`, {
    method: "POST",
    headers: { 
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  console.log(data)

  if (!response.ok) {
    const error = new Error(
      data.message ||
        "Une erreur est survenue lors de la fin de la course. Veuillez réessayer plus tard!"
    );
    error.data = data;
    throw error;
  }

  return data;
}
