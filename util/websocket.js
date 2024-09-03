import { io } from "socket.io-client";
import { SOCKET_SERVER_URL } from "@env";

let socket;

export const initSocket = () => {
  socket = io(SOCKET_SERVER_URL);
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket is not initialized");
  }
  return socket;
};
