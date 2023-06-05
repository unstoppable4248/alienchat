import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import { SocketContext } from "../../ContextApi/socketProvider";
import { Button, CardContent, Card, Typography, CardMedia } from "@mui/material";

import "./MessagesContainer.css";
import SenderMessage from "./SenderMessage/SenderMessage";
import ReceiverMessage from "./ReceiverMessage/ReceiverMessage";

const Messages = () => {
  const [socket, io] = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [reconnectFlag, setReconnectFlag] = useState(false);
  const [flag, setFlag] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (data) => {
        setMessages([...messages, data]);
      });

      socket.on("alien-disconnected", () => {
        setFlag(true);
        socket.emit("leave-all");
        setReconnectFlag(true);
      });

      socket.on("room-count", (data) => {
        if (data === 2) setFlag(false);
      });

      socket.on("connect", () => {
        setReconnectFlag(false);
        setFlag(true);
        setMessages([]);
      });

      socket.on("disconnect", () => {
        setReconnectFlag(false);
        setFlag(true);
        setMessages([]);
      });
    }
  }, [socket, messages, io]);

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "instant" });
  });

  const memoizedMessages = useMemo(() => messages, [messages]);

  const handleReconnect = () => {
    setReconnectFlag(false);
    socket.disconnect();
    socket.connect();
  };

  return (
    <>
      <div className="status-container">
        <div>{flag ? "Waiting for a alien to join" : "You are chatting with an Alien 😉"}</div>
      </div>
      <hr className="divider" />
      <div className="message-container scroll-box">
        {memoizedMessages.map((message, index) => (
          <div key={index}>
            {socket && message.id === socket.id ? (
              <SenderMessage data={message} />
            ) : (
              <ReceiverMessage data={message} avatar={index > 0 && memoizedMessages[index].id === memoizedMessages[index - 1].id ? false : true} />
            )}
          </div>
        ))}

        {reconnectFlag && (
          <div className="reconnect-container">
            <Card
              sx={{
                display: "flex",
                mt: "1rem",
                ml: "0.7rem",
                backgroundColor: "#1e1e1e",
                width: "50%",
                borderRadius: "20px",
              }}
            >
              <CardContent>
                <Typography component="div" variant="h6" sx={{ color: "white", mb: "2rem" }}>
                  Uh oh! Alien 👽 is out for a mission 🚀
                </Typography>
                <Typography component="div" variant="h6">
                  <Button variant="outlined" onClick={handleReconnect}>
                    Start a New Chat 🙃
                  </Button>{" "}
                </Typography>
              </CardContent>
              <CardMedia component="img" sx={{ width: "30%" }} image="/mission-out.jpg" />
            </Card>
          </div>
        )}
        <div ref={ref} className="scrollView"></div>
        <div className="cover-bar"></div>
      </div>
    </>
  );
};

export default Messages;
