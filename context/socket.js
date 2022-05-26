import socketio from "socket.io-client";
import { createContext } from "react";

export const socket = socketio.connect("https://backend-sawerku.herokuapp.com/");
export const SocketContext = createContext();
