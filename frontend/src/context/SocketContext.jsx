import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5555";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    const socket = io(SOCKET_SERVER_URL);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from socket server");
        });

        // return () => {
        //     socket.disconnect();
        // };
    }, []);

    // const sendMessage = (eventName, data) => {
    //     socket.emit(eventName, data);
    // };

    // const receiveMessage = (eventName, callback) => {
    //     socket.on(eventName, callback);
    // };

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
