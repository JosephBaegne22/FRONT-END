import { SOCKET_SERVER_URL } from "@env";

let socket;

export const initSocket = () => {
  socket = new WebSocket(SOCKET_SERVER_URL)

// Connection opened
socket.addEventListener("open", event => {
  socket.send("Connection established")
});

// Listen for messages
socket.addEventListener("message", event => {
  console.log("Message from server ", event.data)
});

// Handle connection close
socket.addEventListener("close", event => {
  console.log("WebSocket connection closed");
});

// Handle errors
socket.addEventListener("error", event => {
  console.error("WebSocket error", event);
});
};

export const closeSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket is not initialized");
  }
  return socket;
};
