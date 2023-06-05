import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    let socket = io.connect("http://localhost:3001", {
      transports: ["websocket", "pooling"],
    });
    socket.on("connect", () => {
      socket.emit("connected");
      socket.emit("join-room");
      setSocket(socket);
    });

    socket.on("connect_error", () => {
      socket.io.opts.transports = ["polling", "websocket"];
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket)
      socket.on("reconnect", () => {
        socket.emit("connected");
        socket.emit("join-room");
        setSocket(socket);
      });
  }, [socket]);

  return <SocketContext.Provider value={[socket, io]}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
