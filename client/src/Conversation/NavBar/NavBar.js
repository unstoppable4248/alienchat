import { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../ContextApi/socketProvider";
import "./NavBar.css";

const NavBar = () => {
  const [socket, io] = useContext(SocketContext);
  const [onlineCount, setOnlineCount] = useState(1);
  const [connectionStatus, setConnectionStatus] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("online-count", (data) => {
        setOnlineCount(data);
      });

      if (socket && socket.connected) {
        setConnectionStatus(true);
      }

      socket.on("connect", () => {
        setOnlineCount(1);
        setConnectionStatus(false);
      });

      socket.on("disconnect", () => {
        setOnlineCount(1);
        setConnectionStatus(false);
      });
    }

    if ((socket && socket.connected === false) || socket === undefined || socket === null) {
      setConnectionStatus(false);
    }
  }, [socket, io, onlineCount]);

  useEffect(() => {
    if (socket && onlineCount === 1) {
      socket.emit("online-members-count");
    }

    if (socket)
      socket.onAny((eventName, args) => {
        console.log(`event '${eventName}' fired with args:`, args);
      });
  });

  return (
    <div className="navbar">
      <div className="logo">logo </div>
      <div className="stats-container">
        <div className="ISS-container">
          {connectionStatus ? (
            <div>
              <span className="green">Connected</span> to ISS 🛰️
            </div>
          ) : (
            <div>
              <span className="red">Disconnected</span> from ISS 🛰️<span></span>
            </div>
          )}
        </div>
        {connectionStatus && <div> Aliens online 🛸: {onlineCount}</div>}
      </div>
    </div>
  );
};

export default NavBar;
