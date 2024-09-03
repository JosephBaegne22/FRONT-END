import { SOCKET_SERVER_URL } from "@env";

let socket;

export const initSocket = () => {
  socket = new WebSocket(SOCKET_SERVER_URL)

// Connection opened
socket.addEventListener("open", event => {
  socket.send("Connection established")
  //socket.send(JSON.stringify({ cmd: 1, data: [2000, 2000, 2000, 2000] }))
});

// Listen for messages
socket.addEventListener("message", event => {
  console.log("Message from server ", event.data)
});
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket is not initialized");
  }
  return socket;
};
