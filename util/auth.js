import { url } from "@env";

async function authenticate(endpoint, email, password) {
  const response = await fetch(`${url}${endpoint}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const data = await response.json();
  const token = data.token;

  return token;
}

export function createUser(email, password) {
  return authenticate("", email, password);
}

export function login(email, password) {
  return authenticate("", email, password);
}
