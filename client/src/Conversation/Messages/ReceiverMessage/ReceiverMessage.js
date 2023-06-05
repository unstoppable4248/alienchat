import React from "react";
import "./ReceiverMessage.css";
import { Avatar } from "@mui/material";
const ReceiverMessage = ({ data, avatar }) => {
  return (
    <div className="receiver-message-container">
      {avatar ? <Avatar src="/aliens.png" /> : <Avatar className="hide" src="/aliens.png" />}
      <div className="receiver-message">
        <div className="receiver-message-content">
          <div className="receiver-message-msg">{data.content}</div>
          <div className="receiver-message-time">{data.time}</div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverMessage;
