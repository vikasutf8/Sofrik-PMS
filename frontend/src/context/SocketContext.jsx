import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5555";

export const SocketContext = createContext();



export const SocketProvider = ({ children }) => {

    const socket = io(SOCKET_SERVER_URL);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from socket server");
        });

    }, []);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
